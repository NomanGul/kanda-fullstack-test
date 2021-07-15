import Header from "./components/Header";
import SignupForm from "./components/SignupForm";

const App = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center sm:bg-gray-200">
        <div className="w-full max-w-lg rounded-lg px-2 sm:px-8 pt-6 pb-8 my-4 bg-white">
          <SignupForm />
        </div>
      </main>
    </>
  );
};

export default App;
