import { ReactComponent as Logo } from "../../logo.svg";

const Header = () => (
  <header className="max-w-full p-6 bg-white shadow sm:bg-indigo-900">
    <Logo className="fill-current text-indigo-900 sm:text-white" />
  </header>
);

export default Header;
