import { useState } from "react";
import * as Yup from "yup";
import InputField from "../InputField";
import { useForm } from "../../Hooks/useForm";

export const validateSchema = () =>
  Yup.object().shape({
    firstName: Yup.string().required("Please enter first name!"),
    lastName: Yup.string().required("Please enter last name!"),
    email: Yup.string().email().required("Please enter valid email!"),
    password: Yup.string()
      .required("Please enter password!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character."
      ),
    confirmPassword: Yup.string()
      .required("Passwords must match!")
      .test("passwords-match", "Passwords must match!", function (value) {
        return this.parent.password === value;
      }),
  });

const SignupForm = () => {
  const { validate, setValue, errors, getValues, onFormBlur } = useForm(
    validateSchema,
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  );
  const initialState = getValues();
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (showSuccess) {
      setShowSuccess(false);
    } else if ((await validate()).isValid) {
      setShowSuccess(true);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-9">
      <h1 className="font-bold text-2xl text-center p-5">
        {showSuccess ? "You’re all set!" : "Sign Up"}
      </h1>
      {!showSuccess && (
        <>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputField
                name="firstName"
                labelText="First Name"
                type="text"
                placeholder="e.g. Noman"
                inputClassNames="block text-gray-600"
                value={initialState["firstName"]}
                onChange={setValue}
                error={!!errors("firstName")}
                helperText={errors("firstName")}
                onBlur={onFormBlur}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <InputField
                name="lastName"
                labelText="Last Name"
                type="text"
                placeholder="e.g. Gul"
                inputClassNames="block text-gray-600"
                value={initialState["lastName"]}
                onChange={setValue}
                error={!!errors("lastName")}
                helperText={errors("lastName")}
                onBlur={onFormBlur}
              />
            </div>
          </div>
          <div className="w-full px-3">
            <InputField
              name="email"
              labelText="Your email"
              type="email"
              placeholder="ex. abc@xyz.com"
              inputClassNames="block text-gray-600"
              value={initialState["email"]}
              onChange={setValue}
              error={!!errors("email")}
              helperText={errors("email")}
              onBlur={onFormBlur}
            />
          </div>
          <div className="w-full px-3">
            <InputField
              name="password"
              labelText="Password"
              type="password"
              value={initialState["password"]}
              onChange={setValue}
              error={!!errors("password")}
              helperText={errors("password")}
              onBlur={onFormBlur}
            />
          </div>
          <div className="w-full px-3">
            <InputField
              name="confirmPassword"
              labelText="Confirm Password"
              type="password"
              value={initialState["confirmPassword"]}
              onChange={setValue}
              error={!!errors("confirmPassword")}
              helperText={errors("confirmPassword")}
              onBlur={onFormBlur}
            />
          </div>
        </>
      )}
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-full py-3 px-16 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {showSuccess ? "Try Again" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
