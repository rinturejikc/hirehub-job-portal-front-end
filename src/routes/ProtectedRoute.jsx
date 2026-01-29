import { Children } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children,allowroles}){
    const token=localStorage.getItem("access");
    const role=localStorage.getItem('role');

    if(!token){
        return <Navigate to="/login" replace/>;

    }

    if(!allowroles.includes(role)){
        return<Navigate to="/unauthorized" replace/>;


    }

    return children;
}

export default ProtectedRoute;