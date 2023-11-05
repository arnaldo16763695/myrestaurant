
import Link from "next/link"



const NavBarManagment = () => {
    return (
        <nav className="flex justify-start gap-6  mx-auto   w-full p-2 ">


            <div><Link className={`hover:text-gray-400 p-2 rounded-lg border border-transparent hover:border-gray-500`} href={`/managment/products`}>Productos</Link></div>
            <div><Link className={`hover:text-gray-400 p-2 rounded-lg border border-transparent hover:border-gray-500`} href={`/managment/categories`}>Categorias</Link></div>



        </nav>
    )
}

export default NavBarManagment