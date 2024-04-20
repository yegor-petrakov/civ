// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";

// const RequireAuth = ({ allowedRoles }) => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     console.log(allowedRoles)

//     return (
//         auth?.username ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
//     );
// }

// export default RequireAuth;


import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    // return (
    //     auth?.roles?.find(role => allowedRoles?.includes(role))
    //         ? <Outlet />
    //         : auth?.accessToken //changed from user to accessToken to persist login after refresh
    //             ? <Navigate to="/unauthorized" state={{ from: location }} replace />
    //             : <Navigate to="/login" state={{ from: location }} replace />
    // );

    return (
        auth?.role && allowedRoles.includes(auth?.role))
        ? <Outlet />
        : <Navigate to="/" state={{ from: location }} replace />
        
}

export default RequireAuth;