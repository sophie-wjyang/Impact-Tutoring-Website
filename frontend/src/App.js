import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

// pages
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import TutorApplication from "./pages/TutorApplication";

import { DashboardTutor, DashboardTutee, DashboardAdmin } from "./pages/Dashboard";
import { ProfilePageTutor, ProfilePageTutee } from "./pages/ProfilePage";
import { UpcomingSessionsPageTutor, UpcomingSessionsPageTutee } from "./pages/UpcomingSessionsPage";
import { MyTuteesPage, MySubjectsPage } from "./pages/MyCommitmentsPage";
import { ResourcesPageTutor, ResourcesPageTutee} from "./pages/ResourcesPage";
import VolunteerHoursPage from "./pages/VolunteerHoursPage";
import Editor from "./pages/EditorPage";
import TutoringHistory from "./pages/TutoringHistoryPage";
import LogOutPage from "./pages/LogOutPage";

import TutorsPage from "./pages/TutorsPage";
import TuteesPage from "./pages/TuteesPage";
import TutorInformationPage from "./pages/TutorInformationPage";
import TuteeInformation from "./pages/TuteeInformationPage";
import PairingsPage from "./pages/PairingsPage";
// import VolunteerHoursApprovalsPage from "./pages/VolunteerHoursApprovalsPage";

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
                    <Route path="sign-up" element={<SignUpPage />} />
                    <Route path="log-in" element={<LogInPage />} />
                    <Route path="tutor-application" element={<TutorApplication />} />

                    {/* tutor dashboard routes */}
                    {userType === "tutor" && (<Route path="dashboard" element={<DashboardTutor />}>
                        <Route index element={<Navigate to="profile" />} />

                        <Route path="profile" element={<ProfilePageTutor />} />

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

                        <Route path="resources" element={<ResourcesPageTutor/>} />
                        <Route path="volunteer-hours" element={<VolunteerHoursPage />} />
                        <Route path="log-out" element={<LogOutPage />} />
                    </Route>)}

                    {/* tutee dashboard routes */}
                    {userType === "tutee" && (<Route path="dashboard" element={<DashboardTutee />}>
                        <Route index element={<Navigate to="profile" />} />

                        <Route path="profile" element={<ProfilePageTutee />} />

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

                        <Route path="resources" element={<ResourcesPageTutee/>} />
                        <Route path="volunteer-hours" element={<VolunteerHoursPage />} />
                        <Route path="log-out" element={<LogOutPage />} />
                    </Route>)}

                    {/* admin dashboard routes */}
                    <Route path="dashboard" element={<DashboardAdmin />}>
                        <Route index element={<Navigate to="tutors" />} />

                        <Route path="tutors" >
                            <Route index element={<TutorsPage />}  />
                            <Route path="tutor-information" element={<TutorInformationPage />} />
                        </Route>

                        <Route path="tutees" >
                            <Route index element={<TuteesPage />}  />
                            <Route path="tutee-information" element={<TuteeInformation />} />
                        </Route>
                        
                        <Route path="pairings" >
                            <Route index element={<PairingsPage />}  />
                            <Route path="tutoring-history" >
                                <Route index element={<TutoringHistory />}  />
                                <Route path="lesson-plan" element={<Editor title="Lesson Plan" />} />
                                <Route path="session-notes" element={<Editor title="Session Notes" />} />
                            </Route>
                        </Route>

                        {/* <Route path="volunteer-hours-approvals" element={<VolunteerHoursApprovalsPage />} /> */}
                        <Route path="log-out" element={<LogOutPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
