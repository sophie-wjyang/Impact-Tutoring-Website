import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Logo from './assets/logos/logo-full.png';
import WhatWeDoGraphic from './assets/images/landing-page/what-we-do-graphic.svg';
import WhoWeAreGraphic from './assets/images/landing-page/who-we-are-graphic.svg';
import BannerGraphic from './assets/images/landing-page/banner-graphic.svg';

import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<HomePage />
	)
  }

export default App;
