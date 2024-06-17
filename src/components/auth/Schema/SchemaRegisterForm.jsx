import * as yup from 'yup'

export const allowedSpecialCharsRegex = /[#$%&+\-@ÀÁÂÄÃÅÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŸàáâäãåçèéêëìíîïñòóôõöøùúûüýÿ]/;
const getMinDate = ()=> {
    const heute = new Date();
    const minimo = new Date(heute.getFullYear() - 15, heute.getMonth(), heute.getDate());
    return minimo;
}
export const registerSchema = yup.object({
    name: yup.string().required('Ingresar el nombre es obligatorio'),
    email: yup.string().email('Correo no valido').required('Email es obligatorio'),
    birthDate: yup.date().required('Ingresar tu fecha de nacimiento es obligatorio.').test(
        'edad',
        'Debes tener al menos 15 años de edad para crear una cuenta',
        (value)=>{
            return value <= getMinDate();
        }
    ),
    pass: yup.string().required('Crear la contraseña es obligatorio')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(allowedSpecialCharsRegex, 'La contraseña debe incluir al menos un carácter especial')
    .matches(/[A-Z]/, 'La contraseña debe incluir al menos una letra mayúscula')
    .matches(/[a-z]/, 'La contraseña debe incluir al menos una letra minúscula')
    .matches(/[0-9]/, 'La contraseña debe incluir al menos un número')
    .matches(/^\S*$/, 'La contraseña no debe tener espacios vacíos')
    .matches(/^[^_]*$/, 'La contraseña no puede tener guiones bajos')
    // eslint-disable-next-line no-control-regex
    .matches(/^[^\0-\x1F\x7F-\x9F]*$/, 'La contraseña no debe tener caracteres no imprimibles'),
    confirmPass: yup.string().oneOf([yup.ref('pass'), null], 'Las contraseñas deben coincidir').required('Confirmar la contraseña es obligatorio')
}) 