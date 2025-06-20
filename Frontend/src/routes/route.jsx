import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/home';
import Cart from '../pages/Cart/Cart';
import Order from '../pages/PlaceOrder/PlaceOrder';
import MainLayout from '../pages/Layout/MainLayout'
import Verify from '../pages/Verify/Verify';
import MyOrders from '../pages/myOrders/MyOrders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      { index: true, element: <Home /> }, // index: true means '/'
      { path: '/cart', element: <Cart /> },
      { path: '/order', element: <Order /> },
      { path: '/verify', element: <Verify /> },
      { path: '/myorders', element: <MyOrders /> },


    ],
  },
]);

export default router;
