import React from "react";
import FormRegister from "../components/FormRegister";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create una cuenta
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormRegister />
        <p className="mt-10 text-center text-sm text-gray-500">
          Ya tienes una cuenta?
          <Link
            href="/login"
            className="ml-3 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Ingresa aquí
          </Link>
          
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
