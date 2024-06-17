import '../css/LoginStyle.css'
import { InputTemplate } from "../components/Inputs";
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterForm } from '../../Hooks/useRegisterForm';
import { onSubmitRegisterForm } from '../../Events/onSubmitRegisterForm';



export const RegistroForm = () => {
    const navegar = useNavigate();

    const { register, handleSubmit, errors, trigger, validPass, validatePass } = useRegisterForm();

    const onSubmit = (data) => {
        onSubmitRegisterForm(data, navegar);
        console.log(data)
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='needs-validation' noValidate>
                <div className="mb-md-5 mt-md-4 pb- text-start">
                    <h2 className="fw-bold mb-2 text-uppercase text-center">Registro</h2>
                    <p className="text-white-50 mb-5 text-center">Por favor completa tu información!</p>
                    <InputTemplate label={'Nombre del Usuario:'} name={'name'} placeholder={'Escribe tu nombre y apellidos'} register={register} errors={errors} trigger={trigger} />
                    <InputTemplate label='Escribe tu correo:' name='email' placeholder={'ejemplo@correo.ejemplo'} register={register} errors={errors} trigger={trigger} />
                    <InputTemplate label='Ingresa tu fecha de nacimiento:' name='birthDate' type='date' register={register} errors={errors} trigger={trigger} />

                    <InputTemplate label='Crea una contraseña:' name='pass' type='password' register={register} errors={errors} trigger={trigger} validatePass={validatePass} />
                    <ul className='text-white text-end'>
                        <li className={validPass.specialChar ? 'text-success' : ''}>Al menos un carácter especial {validPass.specialChar ? '✔' : '❌'}</li>
                        <li className={validPass.uppercase ? 'text-success' : ''}>Al menos una letra mayúscula{validPass.uppercase ? '✔' : '❌'}</li>
                        <li className={validPass.lowercase ? 'text-success' : ''}>Al menos una letra minúscula{validPass.lowercase ? '✔' : '❌'}</li>
                        <li className={validPass.number ? 'text-success' : ''}>Al menos un número{validPass.number ? '✔' : '❌'}</li>
                        <li className={validPass.length ? 'text-success' : ''}>Al menos 8 caracteres{validPass.length ? '✔' : '❌'}</li>
                    </ul>
                    <InputTemplate label='Confirma tu contraseña:' name='confirmPass' type='password' register={register} errors={errors} trigger={trigger} />
                </div>
                <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Registrar</button>
                <div className='pb-5 p-2'>
                    <p className="mb-0">Ya tienes una cuenta? <Link to='/login' className="text-white-50 fw-bold">Login</Link></p>
                </div>
            </form>
        </>
    )
}