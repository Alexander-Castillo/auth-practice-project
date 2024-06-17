
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { registerSchema, allowedSpecialCharsRegex } from '../auth/Schema/SchemaRegisterForm';


export const useRegisterForm=()=>{
    
    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(registerSchema)
    });
    
    const [validPass, setValidPass] = useState({
        length: false,
        specialChar: false,
        uppercase: false,
        lowercase: false,
        number: false,
    })
    const validatePass = (e) => {
        const password = e.target.value;
        setValidPass({
            length: password.length >= 8,
            specialChar: allowedSpecialCharsRegex.test(password),
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
        });
    };

    return {
        register,
        handleSubmit,
        errors,
        trigger,
        validPass,
        validatePass,
    };
}