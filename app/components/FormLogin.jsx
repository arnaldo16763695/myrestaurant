"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const FormLogin = () => {
  const [messageInputEmpty, setMessageInputEmpty] = useState("");
  const [authError, setAuthError] = useState('');
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const loginUser = async (e) => {
    e.preventDefault();
    if (data.email.trim() === "" || data.password.trim() === "") {
      setMessageInputEmpty("Todos los campos son requeridos");
      setTimeout(() => {
        setMessageInputEmpty("");
      }, 3000);
    }

    try {
      const signResponse = await signIn("credentials", {
        ...data,
        redirect: false
      });
      if (!signResponse.ok) {
        throw { message: "Usuario o contraseña incorrectos" }
      }
    } catch (error) {
      setAuthError(error.message)
      setTimeout(() => {
        setAuthError('')
      }, 3000)
      return;
      console.log(error.message)
    }

    router.push('/about')
  };
  return (
    <form className="space-y-6" onSubmit={loginUser}>
      {messageInputEmpty && (
        <p className="text-sm text-red-600">{messageInputEmpty}</p>
      )}
      {authError && (
        <p className="text-sm text-red-600">{authError}</p>
      )}
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
          {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div> */}
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
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};

export default FormLogin;
