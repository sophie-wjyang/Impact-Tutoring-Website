import "./App.css";

import NavBar from "./components/Navbar";
import Banner from "./components/Banner";
import WhoWeAre from "./components/WhoWeAre";
import WhatWeDo from "./components/WhatWeDo";
import HowItWorks from "./components/HowItWorks";
import CallToAction from "./components/CallToAction";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <NavBar />
      <Banner />
      <WhoWeAre />
      <WhatWeDo />
      <HowItWorks />
      <CallToAction />
    </>
  )
}

export default App;
