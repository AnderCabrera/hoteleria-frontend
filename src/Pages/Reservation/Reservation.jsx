import React from 'react'
import MyNavbar from '../../components/Navbar'
import { useLocation } from 'react-router-dom'

export const Reservation = () => {
    const location = useLocation()
    const {selectedServices, rooms} = location.state
    console.log(selectedServices, rooms)
    return (
        <>
            <MyNavbar />

            {selectedServices.length === 0 ? (
                <div className='container-null'>No agregaste servicios extra</div>
            ) : (
                selectedServices.map((service) => (
                    <div key={service._id} className='card'>
                        <div className='card-info'>
                            <p className='card-name'>{service.name}</p>
                            <p className='card-name'>{service.description}</p>
                            <p className='card-name'>${service.price}</p>
                        </div>
                    </div>
                ))

            )

            }
             <div className='container-button-next'>
                <button className='button-next' >Reservar</button>
            </div>
        </>
    )
}
