'use client'
import Link from "next/link";
import {usePathname} from 'next/navigation'
import { Logo } from "./Logo";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between bg-[#0e2439] w-full h-16 border-b-2 px-4">
    <Logo/>
     <div className="flex justify-center items-center h-full text-white">
       <div><Link className={`p-2 rounded-lg border border-transparent ${pathname === '/' ? 'border-gray-400' : ''} hover:text-gray-400 hover:border-gray-400`} href={`/`}>Home</Link></div>
       <div><Link className={`p-2 rounded-lg border border-transparent ${pathname === '/menu' ? 'border-gray-400' : ''} hover:text-gray-400 hover:border-gray-400`} href={`/menu`}>Menú</Link></div>
       <div><Link className={`p-2 rounded-lg border border-transparent ${pathname === '/about' ? 'border-gray-400' : ''} hover:text-gray-400 hover:border-gray-400`} href={`/about`}>Acerca</Link></div>
     </div>
    </nav>
  );
};

export default NavBar;
