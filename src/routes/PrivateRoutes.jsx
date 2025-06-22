import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../firebase/authContext";
import { useState } from "react";


export default function PrivateRoutes() {
    const { userLoggedIn } = useAuth();

    const [ newOrderInfo, setNewOrderInfo ] = useState(null);

    return (
        <>
            {
                userLoggedIn ? <Outlet context={{ newOrderInfo, setNewOrderInfo }} /> : <Navigate to={"/login"} replace />
            }
        </>
    )
}