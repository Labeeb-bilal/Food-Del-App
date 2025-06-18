import { useState } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes/route';
import { StoreContextProvider } from './context/cartcontext';
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='app'>
      <> 
      <StoreContextProvider value={{count}}>
        <RouterProvider router={router}/>
      </StoreContextProvider>
      <ToastContainer/>
      </>
    </div>
  );
}

export default App;
