import { RouterProvider } from 'react-router-dom'
import {router} from "./app.routes"
import "./features/shared/style/global.scss"


const App = () => {
  return (
    
<RouterProvider router={router} />

  )
}

export default App
