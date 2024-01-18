import "./App.css";

import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <NavBar />
      {/* <LandingPage /> */}
      {/* <SignUpPage /> */}
      <LogInPage />
      <Footer />
    </>
  )
}

export default App;
