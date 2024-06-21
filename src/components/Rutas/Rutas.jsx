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
                    {/* Redirige a /login como ruta por defecto */}
                    <Route path="/" element={<Navigate to='/login' />} />

                    {/* Rutas públicas */}
                    <Route path='/login' element={<Login />} />
                    <Route path="/registro" element={<Registro />} />

                    {/* Rutas protegidas */}
                    <Route path="/home" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
                    <Route path="/chat" element={<ProtectedRoute><Layout><Chat/></Layout></ProtectedRoute>} />

                    {/* Maneja rutas no existentes */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
        </>
    )
}