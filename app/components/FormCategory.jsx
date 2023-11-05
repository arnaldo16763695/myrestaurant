'use client'

import { useState } from "react";



const FormCategory = () => {
  const [form, setForm] = useState({
    name: "",

  })
  const [messageInput, setMessageInput] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const addProduct = async (e) => {
    e.preventDefault();

    if (form.name.trim() === "") {
      setMessageInput('Todos los campos son obligatorios')
      setTimeout(() => { setMessageInput('') }, 3000);
      return;
    }

    try {
      const res = await fetch(`/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.status === 201) {
        setMessageInput(data.message)
        setTimeout(() => { setMessageInput('') }, 3000)
        return
      }
      if (data.status === 200) {
        setSuccessMessage(data.message)
        setTimeout(() => { setSuccessMessage('') }, 3000)
        setForm({
          name: "",

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
          Categoría
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Nombre de la categoría"
            value={form.name}
            onChange={(e) => { setForm({ ...form, name: e.target.value }) }}
          />
        </div>
        <div className="my-4 lg:flex flex justify-between lg:justify-start">
          <button className=" text-white hover:bg-gray-700 border-slate-600 rounded-md p-2 text-sm bg-[#0e2439]">Agregar</button>

        </div>
      </div>





    </form>
  );
};

export default FormCategory;
