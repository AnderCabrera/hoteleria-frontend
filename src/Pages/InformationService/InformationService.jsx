import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import MyNavbar from '../../components/Navbar'
import { useEffect } from 'react'
import { getServices } from '../../services/api'

export const InformationService = () => {
    const location = useLocation()
    const { rooms } = location.state
    const [servicesa, setServicesa] = useState([])


    useEffect(() => {
        console.log(rooms)
        getServices(rooms.idHotel)
            .then((response) => {
                setServicesa(response.data)
            })
            .catch((error) => {
                console.error('Error fetching services:', error);
            });
    }, [])

    console.log(servicesa)

    return (
        <>
            <MyNavbar />
        </>
    )
}


export default InformationService