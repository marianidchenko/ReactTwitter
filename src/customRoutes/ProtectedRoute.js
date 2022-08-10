import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = ({user}) => {
    if (!user) {
        return <Navigate to="/404" replace />
    }
    return <Outlet />;
}