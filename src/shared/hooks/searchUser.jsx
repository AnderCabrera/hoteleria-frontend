import React, { useState } from 'react'
import { getUserRequest } from '../../services/api'

export const searchUser = () => {
  const [users, setUsers] = useState(null)
    const useSearch = async(id)=>{
        const response = await getUserRequest(id)
        if(response.error){
          alert(
            response.err.response.data.message ||
            'Error al obtener los usuario'
          )
        }
        setUsers(response.data)
    }

  return {
    users,
    useSearch
  }
}
