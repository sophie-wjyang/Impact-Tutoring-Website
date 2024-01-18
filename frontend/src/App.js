import "./App.css";

import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import TextBox from "./components/form/TextBox";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <NavBar />
      {/* <LandingPage /> */}
      <SignUpPage />
      <TextBox />
      <Footer />
    </>
  )
}

export default App;
