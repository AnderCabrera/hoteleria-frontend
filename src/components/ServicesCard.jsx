import React from 'react'
import { getServices } from '../services/api'

export const ServicesCard = ({id}) => {

  

  useEffect(()=>{
    getServices(hotel._id)
      .then((response)=> {
        setServices(response.data.foundedServices)
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });
  }, [])
  
console.log(services);


  return (
    <>
    {services === null ? (
      <div className='container-null'> 
      </div>
      ):(
        services.map((service)=> (
          <div className='card'>
          <div className='card-info'>
              <p className='card-name'>{service.name}</p>
              <p className='card-name'>{service.description}</p>
              <p className='card-name'>$.{service.price}</p>
          </div>
      </div>
        )
        )
        )}
    </>
  )

}

