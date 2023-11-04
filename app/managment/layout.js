
import NavBarManagment from '../components/NavBarManagment'

const layoutManagment = ({children}) => {
  return (
    <div>
    <NavBarManagment/>
    {children}
    </div>
  )
}

export default layoutManagment