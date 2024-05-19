import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

// pages
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import Dashboard from "./pages/Dashboard";
import TutorApplication from "./pages/TutorApplication";
import ProfilePage from "./pages/ProfilePage";
import UpcomingSessionsPage from "./pages/UpcomingSessionsPage";
import MyTuteesPage from "./pages/MyTuteesPage";
import VolunteerHoursPage from "./pages/VolunteerHoursPage";
import Editor from "./components/Editor";
import LogOutPage from "./pages/LogOutPage";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
	return (
		<div>
			{/* routes */}
			<BrowserRouter>
				<Routes>
                    {/* top level routes */}
					<Route index element={<HomePage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/login" element={<LogInPage />} />
					<Route path="/dashboard/" element={<Dashboard />}>
						{/* dashboard routes */}
						<Route index element={<Navigate to="profile" />} />
						<Route path="profile" element={<ProfilePage />} />
						<Route path="upcoming-sessions" element={<UpcomingSessionsPage />} />
						<Route path="my-tutees" element={<MyTuteesPage />} />
						<Route path="resources/" element={<Editor />} />
						<Route path="volunteer-hours" element={<VolunteerHoursPage />} />
                        <Route path="log-out" element={<LogOutPage />} />
					</Route>
					<Route path="/tutor-application" element={<TutorApplication />} />
				</Routes>
			</BrowserRouter>
		</div>
	) 
}

