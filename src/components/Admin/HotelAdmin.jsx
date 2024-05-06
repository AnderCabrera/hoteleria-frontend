import React, { useState } from 'react'
import { LogoSinLetras } from '../logoSinLetras.jsx'
import { Input } from '../Input.jsx' 
import { addHotel } from '../../shared/hooks/addHotel.jsx'
export const HotelAdmin = () => {
        const {saveHotel} = addHotel()

    const [formData, setFormData] = useState(
        {
            name:{
                value: '',
                isValid: false,
                showError: false
            },
            country:{
                value: '',
                isValid: false,
                showError: false
            },
            address:{
                value: '',
                isValid: false,
                showError: false
            },
            description:{
                value: '',
                isValid: false,
                showError: false
            }
        }
    )

    const onValueChange = (value,field) =>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [field]:{
                    ...prevData[field],
                    value
                }
            }
        ))
    }
    const handleAddHotel = async(e)=>{
        e.preventDefault()
        saveHotel(
            formData.name.value,
            formData.country.value,
            formData.address.value,
            formData.description.value
        )

    }

    return (
        <div className='registro template d-flex justify-content-center align-items-center 110-w vh-110'>
            <LogoSinLetras text={'Kinal Stay'}/>
            <div className='form-container 50-w p-5 rounded '>
                <form onSubmit={handleAddHotel} > 
                    <div className='mb-2'>
                        <Input
                            field='name'
                            label='Nombre'
                            type='text'
                            value={formData.name.value}
                            placeholder='Escribe aqui el nombre'
                            onChangeHandler={onValueChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <Input
                            field='country'
                            label='Ciudad'
                            type='text'
                            value={formData.country.value}
                            placeholder='Escribe aqui la ciudad'
                            onChangeHandler={onValueChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <Input
                            field='address'
                            label='Direccion'
                            type='text'
                            value={formData.address.value}
                            placeholder='Escribe aquí la direccion'
                            onChangeHandler={onValueChange}
                        />
                    </div>
                    <div className='mb-2'>
                        <Input
                            field='description'
                            label='Descripcion'
                            type='text'
                            value={formData.description.value}
                            placeholder='Escribe aqui la descripcion'
                            onChangeHandler={onValueChange}
                        />
                    </div>
                    <div className='button-container'>
                        <button type='submit' className='btn btn-primary'>Agregar</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}
