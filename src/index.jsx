import React from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./firebase/authContext";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PrivateRoutes from "./routes/PrivateRoutes";
import NewOrder from "./pages/NewOrder";
import Summary from "./pages/Summary";
import Success from "./pages/Success";
import Admin from "./pages/Admin";

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/new-order" element={<NewOrder />} />
                        <Route path="/summary" element={<Summary />} />
                        <Route path="/success" element={<Success />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
)