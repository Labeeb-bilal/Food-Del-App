import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom';
import router from './routes/route';
import {ToastContainer} from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
     <ToastContainer/>
     <RouterProvider router={router}/>
   </div>
  )
}

export default App
