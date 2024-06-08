import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

// pages
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import { DashboardTutor, DashboardTutee } from "./pages/Dashboard";
import TutorApplication from "./pages/TutorApplication";
import { ProfilePageTutor, ProfilePageTutee } from "./pages/ProfilePage";
import { UpcomingSessionsPageTutor, UpcomingSessionsPageTutee } from "./pages/UpcomingSessionsPage";
import { MyTuteesPage, MySubjectsPage } from "./pages/MyCommitmentsPage";
import ResourcesPage from "./pages/ResourcesPage";
import VolunteerHoursPage from "./pages/VolunteerHoursPage";
import Editor from "./components/Editor";
import TutoringHistory from "./components/TutoringHistory";
import LogOutPage from "./pages/LogOutPage";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
    const { userType } = useUser();

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

                    {/* tutor dashboard routes */}
                    {userType == "tutor" && (<Route path="dashboard" element={<DashboardTutor />}>
                        <Route index element={<Navigate to="profile" />} />
                        <Route path="profile" element={<ProfilePageTutor />} />

                        {/* upcoming sessions routes */}
                       <Route path="upcoming-sessions">
                            <Route index element={<UpcomingSessionsPageTutor />} />
                            <Route path="lesson-plan" element={<Editor title="Lesson Plan" />} />
                            <Route path="session-notes" element={<Editor title="Session Notes" />} />
                        </Route>

                        <Route path="my-tutees">
                            <Route index element={<MyTuteesPage />} />
                            <Route path="tutoring-history" >
                                <Route index element={<TutoringHistory />}  />
                                <Route path="lesson-plan" element={<Editor title="Lesson Plan" />} />
                                <Route path="session-notes" element={<Editor title="Session Notes" />} />
                            </Route>
                        </Route>
                        <Route path="resources" element={<ResourcesPage/>} />
                        <Route path="volunteer-hours" element={<VolunteerHoursPage />} />
                        <Route path="log-out" element={<LogOutPage />} />
                    </Route>)}

                    {/* tutee dashboard routes */}
                    {userType == "tutee" && (<Route path="dashboard" element={<DashboardTutee />}>
                        <Route index element={<Navigate to="profile" />} />
                        <Route path="profile" element={<ProfilePageTutee />} />

                        {/* upcoming sessions routes */}
                       <Route path="upcoming-sessions">
                            <Route index element={<UpcomingSessionsPageTutee />} />
                            <Route path="lesson-plan" element={<Editor title="Lesson Plan" />} />
                            <Route path="session-notes" element={<Editor title="Session Notes" />} />
                        </Route>

                        <Route path="my-subjects">
                            <Route index element={<MySubjectsPage />} />
                            <Route path="tutoring-history" >
                                <Route index element={<TutoringHistory />}  />
                                <Route path="lesson-plan" element={<Editor title="Lesson Plan" />} />
                                <Route path="session-notes" element={<Editor title="Session Notes" />} />
                            </Route>
                        </Route>
                        <Route path="resources" element={<ResourcesPage/>} />
                        <Route path="volunteer-hours" element={<VolunteerHoursPage />} />
                        <Route path="log-out" element={<LogOutPage />} />
                    </Route>)}
                </Routes>
            </BrowserRouter>
        </div>
    );
}
