import falcon
from falcon import testing
import pytest
import json
from server import app


@pytest.fixture
def client():
    # pytest will inject the object returned by the "client" function
    # as an additional parameter to the test functions.
    return testing.TestClient(app)


def test_empty_request_body(client):
    body = json.dumps({})
    response = client.simulate_post("/", body=body, content_type="application/json")
    result_body = json.loads(response.content)

    assert result_body == {
        "error": "Bad Request",
        "field_errors": {
            "first_name": ["This is required"],
            "last_name": ["This is required"],
            "email": ["This is required"],
            "password": ["This is required"],
        },
    }
    assert response.status == falcon.HTTP_400


def test_missing_fields(client):
    body = json.dumps({"password": "ilovek@ndA1!"})
    response = client.simulate_post("/", body=body, content_type="application/json")
    result_body = json.loads(response.content)

    assert result_body == {
        "error": "Bad Request",
        "field_errors": {
            "first_name": ["This is required"],
            "last_name": ["This is required"],
            "email": ["This is required"],
        },
    }
    assert response.status == falcon.HTTP_400


def test_invalid_type(client):
    body = json.dumps(
        {"first_name": 200, "last_name": "Holmes", "email": "sherlock@example.com", "password": "ilovek@ndA1!"}
    )
    response = client.simulate_post("/", body=body, content_type="application/json")
    result_body = json.loads(response.content)

    assert result_body == {"error": "Bad Request", "field_errors": {"first_name": ["Invalid field type"]}}
    assert response.status == falcon.HTTP_400


def test_invalid_password(client):
    body = json.dumps(
        {"first_name": "Sherlock", "last_name": "Holmes", "email": "sherlock@example.com", "password": "a"}
    )
    response = client.simulate_post("/", body=body, content_type="application/json")
    result_body = json.loads(response.content)

    assert result_body == {
        "error": "Bad Request",
        "field_errors": {
            "password": [
                "Password must be between 8 to 50 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character."
            ]
        },
    }
    assert response.status == falcon.HTTP_400


def test_invalid_email(client):
    body = json.dumps({"first_name": "Sherlock", "last_name": "Holmes", "email": "a@b.c", "password": "ilovek@ndA!"})
    response = client.simulate_post("/", body=body, content_type="application/json")
    result_body = json.loads(response.content)

    assert result_body == {
        "error": "Bad Request",
        "field_errors": {
            "email": ["Invalid email format"],
            "password": [
                "Password must be between 8 to 50 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character."
            ],
        },
    }
    assert response.status == falcon.HTTP_400


def test_successful_request(client):
    body = json.dumps(
        {"first_name": "Sherlock", "last_name": "Holmes", "email": "sherlock@example.com", "password": "ilovek@ndA1!"}
    )
    response = client.simulate_post("/", body=body, content_type="application/json")
    result_body = json.loads(response.content)

    assert result_body == {}
    assert response.status == falcon.HTTP_201
