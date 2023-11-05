import FormCategory from '@/app/components/FormCategory'


const AddCategory = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
    <h1 className='text-center text-2xl p-4'>Agregar categoría</h1>
    <FormCategory/>
   </div>
  )
}

export default AddCategory