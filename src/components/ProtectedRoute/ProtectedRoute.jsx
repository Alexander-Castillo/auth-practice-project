import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Hooks/useAuthContext"



export const ProtectedRoute =({children})=>{
    const {currentUser, loading} = useAuthContext();

    if (loading) {
        // Puedes retornar un spinner o una pantalla de carga mientras se verifica la autenticación
        return <div>Loading...</div>;
    }

    if (!currentUser) {
        // Redirige al login si no hay un usuario autenticado
        return <Navigate to="/login" />;
    }

    return children;
}