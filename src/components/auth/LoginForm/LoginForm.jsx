import { InputTemplate } from "../components/Inputs";
import { useForm } from "react-hook-form"
import '../css/LoginStyle.css'
import { schemaLoginForm } from "../Schema/SchemaLoginForm";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { onSubmitLoginForm } from "../../Events/onSubmitLoginForm";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useEffect } from "react";


export const LoginForm = () => {
    const { currentUser } = useAuthContext();

    const navegar = useNavigate();

    useEffect(()=>{
        if (currentUser) {
            navegar('/home');
        }
    },[currentUser,navegar])

    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(schemaLoginForm)
    });
    const onSubmit=(data)=>{
        onSubmitLoginForm(data,navegar);
        console.log(data)
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-md-5 mt-md-4 pb- text-start">
                <h2 className="fw-bold mb-2 text-uppercase text-center">Login</h2>
                <p className="text-white-50 mb-5 text-center">Please enter your login and password!</p>
                <InputTemplate label={'Correo:'} name={'email'} placeholder={'correo@ejemplo.ejemplo'} register={register} errors={errors} trigger={trigger} />
                <InputTemplate label={'Contraseña:'} type="password" name={'pass'} register={register} errors={errors} trigger={trigger} />
            </div>
            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
        </form>
    )
}