import { ReactComponent as Eye } from "./eye.svg";
import { ReactComponent as EyeOff } from "./eye-off.svg";
import { ReactComponent as Info } from "./info.svg";

const SignupForm = () => {
  return (
    <form className="flex flex-col space-y-9">
      <h1 className="font-bold text-2xl text-center p-5">Sign Up</h1>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block tracking-wide text-gray-900"
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
            className="appearance-none block w-full text-gray-500 border-b border-gray-300 py-2 leading-tight focus:outline-none focus:border-b-1 focus:border-gray-400"
            id="grid-first-name"
            type="text"
            placeholder="ex. text"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block tracking-wide text-gray-900"
            htmlFor="grid-last-name"
          >
            Last Name
          </label>
          <input
            className="appearance-none block w-full text-gray-500 border-b border-gray-300 py-2 leading-tight focus:outline-none focus:border-b-1 focus:border-gray-400"
            id="grid-last-name"
            type="text"
            placeholder="ex. text"
          />
        </div>
      </div>
      <div className="w-full px-3">
        <label
          className="block tracking-wide text-gray-900"
          htmlFor="grid-email"
        >
          Your email
        </label>
        <input
          className="appearance-none block w-full text-gray-500 border-b border-gray-300 py-2 leading-tight focus:outline-none focus:border-b-1 focus:border-gray-400"
          id="grid-email"
          type="email"
          placeholder="ex. abc@xyz.com"
        />
      </div>
      <div className="w-full px-3">
        <label
          className="block tracking-wide text-gray-900"
          htmlFor="grid-password"
        >
          Password
        </label>
        <div className="relative flex w-full flex-wrap items-stretch">
          <input
            className="appearance-none w-full border-b border-gray-300 py-2 leading-tight focus:outline-none focus:border-b-1 focus:border-gray-400"
            id="grid-password"
            type="password"
          />
          <span className="z-10 absolute right-0 bottom-2 text-gray-900 cursor-pointer">
            <Eye className="h-6 w-6" />
          </span>
        </div>
        <div className="flex text-sm text-red-600 pt-2">
          <Info className="h-6 w-10 inline" />
          <p className="pl-1">
            Password must be at least 8 characters with contains at least one
            uppercase letter, symbol and number
          </p>
        </div>
      </div>
      <div className="w-full px-3">
        <label
          className="block tracking-wide text-gray-900"
          htmlFor="grid-confirm-password"
        >
          Confirm Password
        </label>
        <div className="relative flex w-full flex-wrap items-stretch">
          <input
            className="appearance-none w-full border-b border-gray-300 py-2 leading-tight focus:outline-none focus:border-b-1 focus:border-gray-400"
            id="grid-confirm-password"
            type="password"
          />
          <span className="z-10 absolute right-0 bottom-2 text-gray-900 cursor-pointer">
            <EyeOff className="h-6 w-6" />
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-full py-3 px-16 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
