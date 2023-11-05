import FormEditCategory from "@/app/components/FormEditCategory"


const EditCategory = ({ params }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-center text-2xl p-4'>Editar categoría</h1>
      <FormEditCategory params={params} />
    </div>
  )
}

export default EditCategory