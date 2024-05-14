import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { selectCurrentUser } from "../redux/reducers/authSlice";
// import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const token = localStorage.getItem("token");
    if (token) {
        if (allowedRoles.includes(jwtDecode(token)?.userInfo?.role).toString()) {
            return <Outlet />;
        } else {
            return (
                <Navigate
                    to={"/error"}
                    state={{ from: location }}
                    replace
                />
            );
        }
    } else {
        return (
            <Navigate
                to={"/auth/login"}
                state={{ from: location }}
                replace
            />
        );
    }
};

export default RequireAuth;
