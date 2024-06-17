import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext"



export const ProtectedRoute =({children})=>{
    const {currentUser} = useAuthContext();

    if(!currentUser){
        return <Navigate to='/login' />
    }
    return children;
}