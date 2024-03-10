import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import ProfilePage from "./pages/ProfilePage";
import UpcomingSessionsPage from "./pages/UpcomingSessionsPage";
import Footer from "./components/Footer";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
	return (
		<div>
			{/* routes */}
			<BrowserRouter>
				<Routes>
					<Route index element={<HomePage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/login" element={<LogInPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/upcoming-sessions" element={<UpcomingSessionsPage />} />
				</Routes>
			</BrowserRouter>

			<Footer />
		</div>
	) 
}

