import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/config";


{/** AuthContext.jsx  Crear un contexto de autenticación para compartir el estado de autenticación del usuario en toda la aplicación.*/}
const AuthContext = createContext();// manejar el estado de auth global
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = ()=> useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(()=>{
        const fuera = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });
        return fuera;
    },[]);
    return(
        <AuthContext.Provider value={({currentUser})}>
            {children}
        </AuthContext.Provider>
    );
};