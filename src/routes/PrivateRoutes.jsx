import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../firebase/authContext";


export default function PrivateRoutes() {
    const { userLoggedIn } = useAuth();

    return (
        <>
            {
                userLoggedIn ? <Outlet /> : <Navigate to={"/login"} replace />
            }
        </>
    )
}