/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import { useState } from 'react';
import '../css/inputPass.css'

export const InputTemplate = ({ label, type = 'text', name, placeholder, register, errors, trigger, validatePass }) => {

    const [mostrarPass, setMostrarPass] = useState(false);

    return (
        <div data-mdb-input-init className="form-outline form-white mb-4">
            <label htmlFor={name} className="form-label text-start">{label}</label>
            <div className="input-group">
            <input 
                type={mostrarPass ? 'text' : type} 
                id={name} 
                className={`form-control form-control-lg bg-dark text-white ${errors[name] ? 'is-invalid' : ''}`} 
                placeholder={placeholder} 
                {...register(name)} 
                onBlur={() => trigger(name)} 
                onInput={validatePass} />

            {type === 'password' && (
                <button type='button' className='btn btn-outline-secondary' onClick={()=> setMostrarPass(!mostrarPass)}><i className={`fa fa-eye${mostrarPass ? '-slash' : ''}`}></i></button>
            )}
            </div>
            {errors[name] && <div className="invalid-feedback">{errors[name]?.message}</div>}
        </div>
    );
};
InputTemplate.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    errors: PropTypes.object.isRequired,
    trigger: PropTypes.func.isRequired,
    validatePass: PropTypes.func,
};