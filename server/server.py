import falcon
import json
from wsgiref.simple_server import make_server
from schemas.user import UserPostSchema
from middlewares.require_json import RequireJSON
from middlewares.serializer import Serializer


class UserResource:
    serializers = {
        "post": UserPostSchema,
    }

    def on_post(self, _req, resp):
        resp.text = json.dumps({})
        resp.status = falcon.HTTP_201
        return resp


app = falcon.App(
    middleware=[
        RequireJSON(),
        Serializer(),
    ]
)

app.add_route("/", UserResource())

if __name__ == "__main__":
    with make_server("", 8000, app) as httpd:
        print("Serving on port 8000...")

        # Serve until process is killed
        httpd.serve_forever()
