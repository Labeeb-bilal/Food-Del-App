
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/MainLayout/MainLayout";
import AddItem from "../pages/AddItem/AddItem";
import Orders from "../pages/Orders/Order";
import ItemList from "../pages/ItemList/ItemList";
const url = 'http://localhost:8000'

const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout/>,
      children: [
        { index: true, element: <AddItem  url={url}/> }, // index: true means '/'Order
        { path : '/itemList', element: <ItemList url={url}/> },
        { path : '/orders', element: <Orders url={url}/> },
        
      ],
    },
  ]);
  
export default router