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
					<Route path="signup" element={<SignUpPage />} />
					<Route path="login" element={<LogInPage />} />
					<Route path="tutor-application" element={<TutorApplication />} />

                    {/* dashboard routes */}
					<Route path="dashboard" element={<Dashboard />}>
						<Route index element={<Navigate to="profile" />} />
						<Route path="profile" element={<ProfilePage />} />

                        {/* upcoming sessions routes */}
						<Route path="upcoming-sessions">
					        <Route index element={<UpcomingSessionsPage />} />
						    <Route path="lesson-plan" element={<Editor title="Lesson Plan"/>} />
						    <Route path="session-notes" element={<Editor title="Session Notes" />} />
                        </Route>

						<Route path="my-tutees" element={<MyTuteesPage />} />
						<Route path="resources" />
						<Route path="volunteer-hours" element={<VolunteerHoursPage />} />
                        <Route path="log-out" element={<LogOutPage />} />
					</Route>

				</Routes>
			</BrowserRouter>
		</div>
	) 
}

