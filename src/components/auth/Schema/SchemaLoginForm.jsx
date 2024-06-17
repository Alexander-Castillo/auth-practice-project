import * as yup from 'yup'

export const schemaLoginForm = yup.object().shape({
    email: yup.string().email('Correo no valido o no registrado, confirma que tenga una estructura valida').required('Correo registrado es obligatorio'),
    pass: yup.string().min(8,'La contraseña registrada ebe tener minimo 8 caracteres').required('Debes usar tu contraseña')
})