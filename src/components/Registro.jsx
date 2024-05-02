import React, { useState } from 'react'
import './Auth.css'
import { Input } from './Input.jsx'
import { validateEmail, emailValidationMessage } from '../shared/validators/email.validator.js'
import { passwordValidationMessage, validatePassword } from "../shared/validators/password.validator.js"
import { usernameValidationMessage, validateUsername } from "../shared/validators/username.validator.js"
import { passConfirmationValidationMessage, validatePasswordConfirm } from "../shared/validators/confirmPassword.validator.js"
import { LogoSinLetras } from './logoSinLetras.jsx'
import { useRegister } from '../shared/hooks/useRegister.jsx'

export const Registro = () => {

    const {register, isLoading} = useRegister()

    const [formData, setFormData] = useState(
        {
            email: {
                value: '',
                isValid: false,
                showError: false
            },
            username: {
                value: '',
                isValid: false,
                showError: false
            },
            password: {
                value: '',
                isValid: false,
                showError: false
            },
            passwordConfirm: {
                value: '',
                isValid: false,
                showError: false
            },
            name: {
                value: '',
                isValid: false,
                showError: false
            },
            lastname: {
                value: '',
                isValid: false,
                showError: false
            }
        }
    )

    const handleValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'email':
                isValid = validateEmail(value)
                break
            case 'username':
                isValid = validateUsername(value)
                break
            case 'password':
                isValid = validatePassword(value)
                break
            case 'passwordConfirm':
                isValid = validatePasswordConfirm(formData.password.value, value)
                break
            default:
                break
        }
        setFormData((prevData) => (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    isValid,
                    showError: !isValid
                }
            }
        ))
    }

    const onValueChange = (value, field) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                    value
                }
            }
        ))
    }

    const handleRegister = async(e) => {
        e.preventDefault()
        register(
            formData.name.value,
            formData.lastname.value,
            formData.username.value,
            formData.email.value,
            formData.password.value,
        )
    }

    return (
        <div className='registro template d-flex justify-content-center align-items-center 110-w vh-110'>
            <LogoSinLetras text={'Kinal Stay'}/>
            <div className='form-container 50-w p-5 rounded '>
                <form onSubmit={handleRegister}>
                    <div className='mb-2'>
                        <Input
                            field='name'
                            label='Nombre'
                            type='text'
                            value={formData.name.value}
                            placeholder='Escribe aqui tu nombre'
                            onChangeHandler={onValueChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <Input
                            field='lastname'
                            label='Apellido'
                            type='text'
                            value={formData.lastname.value}
                            placeholder='Escribe aqui tu apellido'
                            onChangeHandler={onValueChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <Input
                            field='username'
                            label='Username'
                            type='text'
                            value={formData.username.value}
                            onChangeHandler={onValueChange}
                            onBlurHandler={handleValidationOnBlur}
                            showErrorMessage={formData.username.showError}
                            validationMessage={usernameValidationMessage}
                            placeholder='Escribe aquí tu usuario'
                        />
                    </div>
                    <div className='mb-2'>
                        <Input
                            field='email'
                            label='Correo electrónico'
                            type='email'
                            value={formData.email.value}
                            onChangeHandler={onValueChange}
                            onBlurHandler={handleValidationOnBlur}
                            showErrorMessage={formData.email.showError}
                            validationMessage={emailValidationMessage}
                            placeholder='Escribe aqui tu correo electrónico'
                        />
                    </div>
                    <div className='mb-2'>
                        <Input
                            field='password'
                            label='Contraseña'
                            type='password'
                            value={formData.password.value}
                            onChangeHandler={onValueChange}
                            onBlurHandler={handleValidationOnBlur}
                            showErrorMessage={formData.password.showError}
                            validationMessage={passwordValidationMessage}
                            placeholder='Escribe aqui tu contraseña'
                        />
                    </div>
                    <div className='mb-2'>
                        <Input
                            field='passwordConfirm'
                            label='Confirmación de contraseña'
                            type='password'
                            value={formData.passwordConfirm.value}
                            onChangeHandler={onValueChange}
                            onBlurHandler={handleValidationOnBlur}
                            showErrorMessage={formData.passwordConfirm.showError}
                            validationMessage={passConfirmationValidationMessage}
                            placeholder='Confirma aqui tu contraseña'
                        />
                    </div>
                    <div className='button-container'>
                        <button className='btn btn-primary'>Registrarse</button>
                    </div>
                    <p className='mt-3'>
                        ¿Ya tienes una cuenta?
                        <a href='/login'>Inicia sesión</a>
                    </p>
                </form>
            </div>
        </div>
    )
}