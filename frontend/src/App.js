import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import Dashboard from "./pages/Dashboard";
import TutorApplication from "./pages/TutorApplication";
import Tiptap from "./pages/Tiptap";

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
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/tutor-application" element={<TutorApplication />} />
					<Route path="/tiptap" element={<Tiptap />} />
				</Routes>
			</BrowserRouter>
		</div>
	) 
}

