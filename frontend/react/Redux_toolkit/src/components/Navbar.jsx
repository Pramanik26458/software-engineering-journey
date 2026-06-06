import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeThemeToDark, changeThemeToLight } from '../redux/slices/theme'

const Navbar = () => {
    const dispatch=useDispatch()
   const theme= useSelector((state)=>{return state.theme.value})
  return (
    <div>
        <h1>Current Theme is: {theme} </h1>
        <button onClick={()=>{
            dispatch(changeThemeToLight())
        }}>Change Theme To Light</button>
        <button  onClick={()=>{
            dispatch(changeThemeToDark())
        }}>Change Theme To Dark</button>
       
    </div>
  )
}

export default Navbar
