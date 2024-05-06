import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HotelAdmin } from './HotelAdmin'
export const AdminContainer = () => {
  return (
    <div>
        <Routes>
            <Route path='HotelAdmin' element={<HotelAdmin/>} />
          
        </Routes>
    </div>
  )
}
