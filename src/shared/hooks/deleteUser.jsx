import React from 'react'
import { deleteUserRequest } from '../../services/api'

export const deleteUser = () => {
    const usedeleteUser = async () => {
        const response = await deleteUserRequest()
        if (response.error) {
            alert('error al eliminar')
        }
        alert('post eliminado')
    }
    return {
        usedeleteUser
    }


}
