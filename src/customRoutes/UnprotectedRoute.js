import { Navigate, Outlet } from "react-router-dom"

export const UnprotectedRoute = ({user}) => {
    if (user) {
        return <Navigate to="/" replace />
    }
    return <Outlet />;
}