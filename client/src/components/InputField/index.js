import { useState } from "react";
import { ReactComponent as Eye } from "../../assets/eye.svg";
import { ReactComponent as EyeOff } from "../../assets/eye-off.svg";
import { ReactComponent as Info } from "../../assets/info.svg";

const InputField = ({
  name,
  labelText,
  type,
  inputClassNames = "",
  placeholder = "",
  error = false,
  helperText = "",
  ...restOfProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <label className="block tracking-wide text-gray-900" htmlFor={name}>
        {labelText}
      </label>
      {type === "password" ? (
        <div className="relative flex w-full flex-wrap items-stretch">
          <input
            {...restOfProps}
            className={`appearance-none w-full border-b border-gray-300 py-2 leading-tight focus:outline-none focus:border-b-1 focus:border-gray-400 ${inputClassNames}`}
            id={name}
            name={name}
            type={showPassword ? "text" : type}
            placeholder={placeholder}
          />
          <div
            className="z-10 absolute right-0 bottom-2 text-gray-900 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <Eye className="h-6 w-6" />
            ) : (
              <EyeOff className="h-6 w-6" />
            )}
          </div>
        </div>
      ) : (
        <input
          {...restOfProps}
          className={`appearance-none w-full border-b border-gray-300 py-2 leading-tight focus:outline-none focus:border-b-1 focus:border-gray-400 ${inputClassNames}`}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
        />
      )}
      {error && (
        <div className="flex text-sm text-red-600 pt-2">
          <Info className="h-6 w-6 inline" />
          <p className="pl-1 w-11/12">{helperText}</p>
        </div>
      )}
    </>
  );
};

export default InputField;
