import "./App.css";
import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./hooks/useUser";
import { AuthenticatedRoutes, UnauthenticatedRoutes } from "./CustomRoutes";

// public routes (you can only access these if you're not logged in)
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";

// protected routes (you can only access these if you're logged in)
import ApplicationStatus from "./pages/ApplicationStatusPage";
import TutorApplication from "./pages/TutorApplication";
import TuteeSignupInformation from "./pages/TuteeSignupInformation";

import { DashboardTutor, DashboardTutee, DashboardAdmin } from "./pages/Dashboard";
import { ProfilePageTutor, ProfilePageTutee } from "./pages/ProfilePage";
import { UpcomingSessionsPageTutor, UpcomingSessionsPageTutee } from "./pages/UpcomingSessionsPage";
import { MyTuteesPage, MySubjectsPage } from "./pages/MyCommitmentsPage";
import { ResourcesPageTutor, ResourcesPageTutee } from "./pages/ResourcesPage";
import VolunteerHoursRequestPage from "./pages/VolunteerHoursRequestPage";
import Editor from "./pages/EditorPage";
import TutoringHistory from "./pages/TutoringHistoryPage";
import TutorsPage from "./pages/TutorsPage";
import TuteesPage from "./pages/TuteesPage";
import TutorInformationPage from "./pages/TutorInformationPage";
import TuteeInformation from "./pages/TuteeInformationPage";
import PairingsPage from "./pages/PairingsPage";
import PendingVolunteerHoursApprovalsPage from "./pages/PendingVolunteerHoursApprovalsPage";
import VolunteerHoursApprovalPage from "./pages/VolunteerHoursApprovalPage";
import LogOutPage from "./pages/LogOutPage";

// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
    const { user } = useUser();

    return (
        <div>
            {/* routes */}
            <BrowserRouter>
                <Routes>
                    <Route path="log-out" element={<LogOutPage />} />

                    {/* unauthenticated routes (you can only access these if you're not logged in) */}
                    <Route element={<UnauthenticatedRoutes />}>
                        <Route index element={<HomePage />} />
                        <Route path="sign-up" element={<SignUpPage />} />
                        <Route path="log-in" element={<LogInPage />} />
                    </Route>

                    {/* protected routes (you can only access these if you're logged in) */}
                    <Route element={<AuthenticatedRoutes />}>
                        {/* tutor dashboard routes */}
                        {user?.type === "tutor" && (
                            <Route path="dashboard" element={<DashboardTutor />}>
                                <Route index element={<Navigate to="profile" />} />

                                <Route path="tutor-application" element={<TutorApplication />} />
                                <Route path="application-applied" element={<ApplicationStatus status="applied" />} />
                                <Route path="application-rejected" element={<ApplicationStatus status="rejected" />} />

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
                            </Route>
                        )}

                        {/* tutee dashboard routes */}
                        {user?.type === "tutee" && (
                            <Route path="dashboard" element={<DashboardTutee />}>
                                <Route index element={<Navigate to="profile" />} />

                                <Route path="tutee-signup-information" element={<TuteeSignupInformation />} />

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
                            </Route>
                        )}

                        {/* admin dashboard routes */}
                        {user?.type === "admin" && (
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
                            </Route>
                        )}
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
