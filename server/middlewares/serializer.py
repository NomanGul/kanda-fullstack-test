import json
from falcon.status_codes import HTTP_404, HTTP_400
from marshmallow import ValidationError
from utils.HTTPError import HTTPError


class Serializer:
    """
    This middleware gives us a possibility to validate data from request body.

    It also allows to set a separate schema (validator) for every HTTP method.
    At the end, it sets serializer data in context so we can read the data in API
    endpoint (if needed). If the data is not correct, API returns HTTP 400 error
    with validation message returned by marshmallow.
    """

    def process_resource(self, req, _resp, resource, _params):
        body = json.load(req.bounded_stream)
        try:
            serializer = resource.serializers[req.method.lower()]
        except (AttributeError, IndexError, KeyError):
            raise HTTPError(status=HTTP_404)
        else:
            try:
                req.context["serializer"] = serializer().load(data=body)
            except ValidationError as err:
                raise HTTPError(error="Bad Request", status=HTTP_400, field_errors=err.messages)
