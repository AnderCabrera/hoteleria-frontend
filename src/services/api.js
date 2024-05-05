import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:2880',
    timeout: 5000
})

export const registerRequest = async (data) => {
    try {
        return await apiClient.post('/user/newUser', data)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

export const loginRequest = async (data) => {
    try {
        return await apiClient.post('/user/login', data)
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}
export const deleteUserRequest = async()=>{
    try {
        return await apiClient.get('/user/delete')
    } catch (err) {
        return {
            error: true,
            err
        }
        
    }
}

apiClient.interceptors.request.use(
    config=> {
        const token = localStorage.getItem('token')
        if(token){
            config.headers.token = token
        }
        return config
    },
    err=> Promise.reject(err)
)


export const getHotelRequest = async()=>{
    try{
        return await apiClient.get('/hotel/get')
    }catch(err){
        return {
            error: true,
            err
        }
    }
}



