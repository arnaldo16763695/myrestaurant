import SubNavBar from "../components/NavBarMenu.jsx"



const layoutMenu = ({children}) => {
  return (
    <div>
    <h1 className='text-center text-2xl p-4'>Menú del Día</h1>
    <SubNavBar/>
     {children}
   
    </div>
  )
}

export default layoutMenu