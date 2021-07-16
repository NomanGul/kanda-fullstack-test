from marshmallow import fields, Schema, ValidationError, validates
import re


# customize required field error message
fields.Field.default_error_messages["required"] = "This is required"


class UserPostSchema(Schema):
    """Marshmallow Schema for User POST resource"""

    class Meta:
        ordered = True

    first_name = fields.Str(required=True, error_messages={"invalid": "Invalid field type"})
    last_name = fields.Str(required=True, error_messages={"invalid": "Invalid field type"})
    email = fields.Email(required=True, error_messages={"invalid": "Invalid email format"})
    password = fields.Str(required=True, load_only=True)

    @validates("password")
    def validate_password(self, value):
        message = "Password must be between 8 to 50 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character."
        password_regex = re.compile(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,50}$")
        if not password_regex.match(value):
            raise ValidationError(message)
