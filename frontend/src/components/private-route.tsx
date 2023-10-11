import { Navigate } from "react-router-dom";
//import { getToken } from "../utils/get-token";

const getToken = () => {
    return true;
}

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
}