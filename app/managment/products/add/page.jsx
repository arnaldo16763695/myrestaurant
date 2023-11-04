import FormProduct from '@/app/components/FormProduct'
import React from 'react'

const AddProduct = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
    <h1 className='text-center text-2xl p-4'>Agregar productos</h1>
    <FormProduct/>
   </div>
  )
}

export default AddProduct