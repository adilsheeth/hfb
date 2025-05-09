import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../firebase/authContext";
import { useEffect } from "react";


export default function PrivateRoutes() {
    const { userLoggedIn, loading } = useAuth();

    return (
        <>
            {
                userLoggedIn ? <Outlet /> : <Navigate to={"/login"} replace />
            }
        </>
    )
}