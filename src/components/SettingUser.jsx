import React, { useState } from 'react'
import MyNavbar from './Navbar'
import { jwtDecode } from 'jwt-decode';
import { LogoSinLetras } from './logoSinLetras.jsx'
import { Input } from './Input.jsx'
import { deleteUser } from '../shared/hooks/deleteUser.jsx';
export const SettingUser = () => {
        const {usedeleteUser} = deleteUser()

return (
    <>
    <MyNavbar/>
    <div className='registro template d-flex justify-content-center align-items-center 110-w vh-110'>
        <LogoSinLetras text={'Kinal Stay'}/>
        <div className='form-container 50-w p-5 rounded '>
            <form >
                <div className='mb-2'>
                    <Input
                        field='name'
                        label='Nombre'
                        type='text'
                       
                    />
                </div>
                <div className='mb-2'>
                    <Input
                        field='lastname'
                        label='Apellido'
                        type='text'
                        
                    />
                </div>
                <div className='mb-2'>
                    <Input
                        field='username'
                        label='Username'
                        type='text'
                       
                    />
                </div>
                <div className='mb-2'>
                    <Input
                        field='email'
                        label='Correo electrónico'
                        type='email'
                  
                    />
                </div>
                <div className='mb-2'>
                    <Input
                        field='password'
                        label='Contraseña Antigua'
                        type='password'
                        
                        placeholder='Escribe aqui la contraseña actual'
                    />
                </div>
                <div className='mb-2'>
                    <Input
                        field='passwordConfirm'
                        label='Confirmación de contraseña'
                        type='password'
                        
                        placeholder='Escribe la contraseña nueva'
                    />
                </div>
                <div className='button-container d-flex justify-content-between '>
                    <button className='btn btn-primary'>Actualizar</button>
                    <button onClick={usedeleteUser()} className='btn btn-primary'>Eliminar</button>
                </div>
                
            </form>
        </div>
    </div>
    </>
)
}
