from falcon import HTTPNotAcceptable, HTTPUnsupportedMediaType


class RequireJSON:
    """
    This middleware validate request headers required for JSON.

    If the request headers are not valid, It returns HTTPNotAcceptable or
    HTTPUnsupportedMediaType error with short message.
    """

    def process_request(self, req, _resp):
        if not req.client_accepts_json:
            raise HTTPNotAcceptable(
                description="This API only supports responses encoded as JSON.",
            )

        if req.method == "POST" and "application/json" not in req.content_type:
            raise HTTPUnsupportedMediaType(title="This API only supports requests encoded as JSON.")
