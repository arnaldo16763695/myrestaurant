'use client'

import { useState } from "react";
import { useEffect } from "react";



const FormProduct = () => {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    price: ""
  })
  const [messageInput, setMessageInput] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const getCategories = async () => {
    const res = await fetch(`/api/categories`);
    const data = await res.json();
    setCategories(data)

  }

  useEffect(() => {
    getCategories();
  }, [])

  const addProduct = async (e) => {
    e.preventDefault();
    
    // if (form.name.trim()==="" || form.price.trim()==="" || form.categoryId.trim()==="") {
    //   setMessageInput('Todos los campos son obligatorios')
    //   setTimeout(()=>{setMessageInput('')},3000);
    //   return;
    // }
    // if (isNaN(form.price)) {
    //   setMessageInput('El precio debe ser numérico')
    //   setTimeout(()=>{setMessageInput('')},3000);
    //   return;
    // }
    // if (form.price <=0) {
    //   setMessageInput('El precio debe ser mayor a cero')
    //   setTimeout(()=>{setMessageInput('')},3000);
    //   return;
    // }

    try {
      const res = await fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.status===201) {
        setMessageInput(data.message)
        setTimeout(()=>{setMessageInput('')},3000)
        return
      }
      if (data.status===200) {
        setSuccessMessage(data.message)
        setTimeout(()=>{setSuccessMessage('')},3000)
        setForm({
          name: "",
          categoryId: "",
          price: ""
        })
        return
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <form
      className="border border-slate-400 rounded-lg  w-[80%] lg:w-[60%] p-5"
      autoComplete="off"
      onSubmit={addProduct}
    >
    {messageInput && <p className="text-red-600">{messageInput}</p>}
    {successMessage && <div className="bg-green-500  p-2 text-center">{successMessage}</div>}
      <div className="my-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Producto
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Nombre del producto"
            value={form.name}
            onChange={(e) => { setForm({ ...form, name: e.target.value }) }}
          />
        </div>
      </div>
      <div className="my-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Categoría
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <select
            type="text"
            name="category"
            id="category"
            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Nombre del producto"
            value={form.categoryId}
            onChange={(e) => { setForm({ ...form, categoryId: e.target.value }) }}
          >
            <option value="">Escoge una categoría</option>
            {
              categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div className="my-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Precio
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            name="price"
            id="price"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
            value={form.price}
            onChange={(e) => { setForm({ ...form, price: e.target.value }) }}
          />

        </div>
        <div className="my-4 lg:flex flex justify-between lg:justify-start">
          <button className=" text-white hover:bg-gray-700 border-slate-600 rounded-md p-2 text-sm bg-[#0e2439]">Agregar</button>

        </div>
      </div>
    </form>
  );
};

export default FormProduct;
