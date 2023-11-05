import FormEditProducts from '@/app/components/FormEditProducts'
import React from 'react'

const EditProduct = ({ params }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-center text-2xl p-4'>Editar productos</h1>
      <FormEditProducts params={params} />
    </div>
  )
}

export default EditProduct