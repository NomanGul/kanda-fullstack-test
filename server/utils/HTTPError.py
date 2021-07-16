import falcon


class HTTPError(falcon.HTTPError):
    """
    HTTPError that stores a dictionary of validation error messages.
    """

    def __init__(self, status, error="", field_errors=None, *args, **kwargs):
        self.error = error
        self.field_errors = field_errors
        super().__init__(status, *args, **kwargs)

    def to_dict(self, *args, **kwargs):
        """
        Override `falcon.HTTPError` to include error messages in responses.
        """

        response = {}

        if self.field_errors is not None:
            response["error"] = self.error
            response["field_errors"] = self.field_errors

        # return default response if there is no field_errors
        return response or super().to_dict(*args, **kwargs)
