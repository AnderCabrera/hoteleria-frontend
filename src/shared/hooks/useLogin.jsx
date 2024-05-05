import {useState} from 'react'
import { loginRequest } from '../../services/api'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    
    const login = async(username, password) => {
        setIsLoading(true)
        const user = {
            username,
            password
        }
        const response = await loginRequest(user)
        setIsLoading(false)

        if(response.error){
            return toast.error(
                response?.e?.response?.data ||
                'Error general al intentar logearse. Intenta de nuevo.'
            )
        } else if (response) {
            console.log(response)
            const { userDetails } = response.data
            localStorage.setItem('token', response.data.token)
            
            navigate('/registro')
            return toast.success(
                'Te has logeado exitosamente'
            )
        }
    }
    return {
        login,
        isLoading
    }
}
