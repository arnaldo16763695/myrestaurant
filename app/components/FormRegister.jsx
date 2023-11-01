"use client";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

const FormRegister = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [messPass, setMessPass] = useState("");
  const [messageInputEmpty, setMessageInputEmpty] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    // console.log(data);
    if (data.password !== data.password2) {
      setMessPass("Los password no coinciden");
      setTimeout(() => {
        setMessPass("");
      }, 3000);
      return;
    }

    if (
      data.name.trim() === "" ||
      data.password.trim() === "" ||
      data.password2.trim() === "" ||
      data.email.trim() === ""
    ) {
      setMessageInputEmpty("Todos los campos son requeridos");
      setTimeout(() => {
        setMessageInputEmpty("");
      }, 3000);
      return
    }
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      // automatically signIn      
      // const resAuth = await signIn('credentials', {
      //   email: data.email,
      //   password: data.password
      // }, redirect: false)

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="space-y-6" onSubmit={registerUser}>
      {messageInputEmpty && (
        <p className="text-sm text-red-600">{messageInputEmpty}</p>
      )}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Nombre
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required=""
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required=""
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required=""
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password2"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Repite el Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password2"
            name="password2"
            type="password"
            autoComplete="current-password"
            required=""
            value={data.password2}
            onChange={(e) => {
              setData({ ...data, password2: e.target.value });
            }}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {messPass && (
            <p className="text-sm text-red-600">{messPass}</p>
          )}
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Registrarme
        </button>
      </div>
    </form>
  );
};

export default FormRegister;
