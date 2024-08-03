import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useUser } from "./other/UserContext";

// pages
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import { ConfirmSignupPage, ReconfirmSignupPage } from "./pages/ConfirmSignupPage";
import TutorApplication from "./pages/TutorApplication";

import { DashboardTutor, DashboardTutee, DashboardAdmin } from "./pages/Dashboard";
import { ProfilePageTutor, ProfilePageTutee } from "./pages/ProfilePage";
import { UpcomingSessionsPageTutor, UpcomingSessionsPageTutee } from "./pages/UpcomingSessionsPage";
import { MyTuteesPage, MySubjectsPage } from "./pages/MyCommitmentsPage";
import { ResourcesPageTutor, ResourcesPageTutee } from "./pages/ResourcesPage";
import VolunteerHoursRequestPage from "./pages/VolunteerHoursRequestPage";
import Editor from "./pages/EditorPage";
import TutoringHistory from "./pages/TutoringHistoryPage";
import LogOutPage from "./pages/LogOutPage";

import TutorsPage from "./pages/TutorsPage";
import TuteesPage from "./pages/TuteesPage";
import TutorInformationPage from "./pages/TutorInformationPage";
import TuteeInformation from "./pages/TuteeInformationPage";
import PairingsPage from "./pages/PairingsPage";
import PendingVolunteerHoursApprovalsPage from "./pages/PendingVolunteerHoursApprovalsPage";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import VolunteerHoursApprovalPage from "./pages/VolunteerHoursApprovalPage";

export default function App() {
    // const { userType } = useUser();

    return (
        <div>
            {/* routes */}
            <BrowserRouter>
                <Routes>
                    {/* top level routes */}
                    <Route index element={<HomePage />} />
                    <Route path="sign-up" element={<SignUpPage />} />
                    <Route path="log-in" element={<LogInPage />} />
                    <Route path="confirm-signup" element={<ConfirmSignupPage />} />
                    <Route path="reconfirm-signup" element={<ReconfirmSignupPage />} />
                    <Route path="tutor-application" element={<TutorApplication />} />

                    {/* tutor dashboard routes */}
                    {userType === "tutor" && (
                        <Route path="dashboard" element={<DashboardTutor />}>
                            <Route index element={<Navigate to="profile" />} />

                            <Route path="profile" element={<ProfilePageTutor />} />

                            <Route path="upcoming-sessions">
                                <Route index element={<UpcomingSessionsPageTutor />} />
                                <Route path="lesson-plan" element={<Editor title="Lesson Plan" />} />
                                <Route path="session-notes" element={<Editor title="Session Notes" />} />
                            </Route>

                            <Route path="my-tutees">
                                <Route index element={<MyTuteesPage />} />
                                <Route path="tutoring-history">
                                    <Route index element={<TutoringHistory />} />
                                    <Route path="lesson-plan" element={<Editor title="Lesson Plan" />} />
                                    <Route path="session-notes" element={<Editor title="Session Notes" />} />
                                </Route>
                            </Route>

                            <Route path="resources" element={<ResourcesPageTutor />} />
                            <Route path="volunteer-hours-request" element={<VolunteerHoursRequestPage />} />
                            <Route path="log-out" element={<LogOutPage />} />
                        </Route>
                    )}

                    {/* tutee dashboard routes */}
                    {userType === "tutee" && (
                        <Route path="dashboard" element={<DashboardTutee />}>
                            <Route index element={<Navigate to="profile" />} />

                            <Route path="profile" element={<ProfilePageTutee />} />

                            <Route path="upcoming-sessions">
                                <Route index element={<UpcomingSessionsPageTutee />} />
                                <Route path="lesson-plan" element={<Editor title="Lesson Plan" />} />
                                <Route path="session-notes" element={<Editor title="Session Notes" />} />
                            </Route>

                            <Route path="my-subjects">
                                <Route index element={<MySubjectsPage />} />
                                <Route path="tutoring-history">
                                    <Route index element={<TutoringHistory />} />
                                    <Route path="lesson-plan" element={<Editor title="Lesson Plan" />} />
                                    <Route path="session-notes" element={<Editor title="Session Notes" />} />
                                </Route>
                            </Route>

                            <Route path="resources" element={<ResourcesPageTutee />} />
                            <Route path="log-out" element={<LogOutPage />} />
                        </Route>
                    )}

                    {/* admin dashboard routes */}
                    {userType === "admin" && (
                        <Route path="dashboard" element={<DashboardAdmin />}>
                            <Route index element={<Navigate to="tutors" />} />

                            <Route path="tutors">
                                <Route index element={<TutorsPage />} />
                                <Route path="tutor-information" element={<TutorInformationPage />} />
                            </Route>

                            <Route path="tutees">
                                <Route index element={<TuteesPage />} />
                                <Route path="tutee-information" element={<TuteeInformation />} />
                            </Route>

                            <Route path="pairings">
                                <Route index element={<PairingsPage />} />
                                <Route path="tutoring-history">
                                    <Route index element={<TutoringHistory />} />
                                    <Route path="lesson-plan" element={<Editor title="Lesson Plan" />} />
                                    <Route path="session-notes" element={<Editor title="Session Notes" />} />
                                </Route>
                            </Route>

                            <Route path="pending-volunteer-hours-approvals">
                                <Route index element={<PendingVolunteerHoursApprovalsPage />} />
                                <Route path="volunteer-hours-approval" element={<VolunteerHoursApprovalPage />} />
                            </Route>
                            <Route path="log-out" element={<LogOutPage />} />
                        </Route>
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}
