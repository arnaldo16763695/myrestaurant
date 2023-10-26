import { Inter } from 'next/font/google'
import './globals.css'

import { Logo } from "./components/Logo";
import NavBarMain from './components/NavBarMain';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto  min-h-screen ">
          <header className="flex justify-around">
            
           
            <NavBarMain/>
          </header>
          <main>{children}</main>
          <footer></footer>
        </main>
      </body>
    </html>
  )
}
