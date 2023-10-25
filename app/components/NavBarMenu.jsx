'use client'
import Link from 'next/link'
import {useParams, usePathname} from 'next/navigation'


const NavBarMenu = ({myparams}) => {
  const pathname = usePathname();
  const param = useParams();
  return (
    <nav className="flex justify-center gap-6   w-full p-6">
    <div><Link className={`  hover:text-gray-400 p-2 rounded-lg border border-transparent hover:border-gray-500`} href={`/menu/2`}>Suchi</Link></div>
    <div><Link className={` hover:text-gray-400 p-2 rounded-lg border border-transparent hover:border-gray-500`} href={`/menu/3`}>Bebidas</Link></div>
    <div><Link className={` hover:text-gray-400 p-2 rounded-lg border border-transparent hover:border-gray-500`} href={`/menu/4`}>Snack</Link></div>
  </nav>
  )
}

export default NavBarMenu