import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./hooks/useUser";

export function AuthenticatedRoutes() {
    const { user, isLoading } = useUser();

    // if the user is logged out, redirect them to the login page
    return isLoading ? null : !user?.type ? <Navigate to="/log-in" /> : <Outlet />;
}

export function UnauthenticatedRoutes() {
    const { user, isLoading } = useUser();

    // if the user is logged in, redirect them to the dashboard
    return isLoading ? null : user?.type ? <Navigate to="/dashboard" /> : <Outlet />;
}
