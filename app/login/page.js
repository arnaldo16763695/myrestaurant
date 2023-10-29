import React from "react";
import FormLogin from "../components/FormLogin";
import Link from "next/link";

const LoginPage = () => {

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inicia Sesión
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormLogin/>
        <p className="mt-10 text-center text-sm text-gray-500">
          No estas registrado?
          <Link
            href="/register"
            className="ml-3 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Hazlo aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
