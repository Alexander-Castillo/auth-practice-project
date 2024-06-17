import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../../Pages/Login/Login"
import { Registro } from "../../Pages/Registro/Registro"
import { Layout } from "../Layout/Layout"
import { Home } from "../../Pages/Home/Home"
import { AuthProvider } from "../Hooks/useAuthContext"
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute"
import { Chat } from "../../Pages/Chat/Chat"


export const Rutas = () => {

    return (
        <>
            {/** envuelve la aplicacion proporcionando contexto de auntentificacion */}
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to='/login' />} />
                        <Route path='/login' element={<Login />} />
                        <Route path="/registro" element={<Registro />} />
                        <Route path="/home" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
                        <Route path="/chat" element={<ProtectedRoute><Layout><Chat/></Layout></ProtectedRoute>} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </>
    )
}