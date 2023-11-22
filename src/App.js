import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import WhoWeAre from "./components/WhoWeAre";
import WhatWeDo from "./components/WhatWeDo";
import HowItWorks from "./components/HowItWorks";
import CallToAction from "./components/CallToAction";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <WhoWeAre />
      <WhatWeDo />
      <HowItWorks />
      <CallToAction />
    </>
  )
}

export default App;
