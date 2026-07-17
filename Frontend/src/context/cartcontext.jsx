import { createContext, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  
  const [cartData, setCartData] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    setCount(Object.values(cartData).reduce((sum, qty) => sum + qty, 0));
  }, [cartData]);
  
  console.log(count);
  
  const [token,settoken] = useState();

  useEffect(() => {
      handleFetchFood();
      const token = localStorage.getItem('token');
      if (token) {
       settoken(token);
       handlegetCartData(token);
       console.log(token)
      }
  }, []);
 
  const handleFetchFood = async () => {
    try {
      const response = await axios.get(`${url}/food/getAllFoodList`);
      setDishes(response.data.data);
    } catch (error) {
       console.log(error);
    }
  }

  const url = import.meta.env.VITE_API_URL;

  useEffect(()=> {
    console.log('url is',url)
  })
 
  const handleDecrement = async (itemId) => {
    setCartData(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) - 1
    }));
    setCount(count-1);

    if (token) {
      const response = await axios.post(`${url}/cart/removeFromCart`, {itemId},{
      headers : {token}
     })
     console.log(response.data.message);
  }
  };
  

  const handleIncrement = async (itemId) => {
    console.log(itemId,'itemId');
     setCartData(prev => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1
      }));
    setCount(count+1);

    if (token) {
        const response = await axios.post(`${url}/cart/addToCart`, {itemId},{
        headers : {token}
       })
       console.log(response.data.message);
    }
  };
  
  const handleRemoveItem = async (id) => {

    const updatedCartData = Object.fromEntries(
      Object.entries(cartData).filter(([key]) => key!== id ))    
      setCartData(updatedCartData);

    //update quantity upon remving 
    // debugger
    // const updateDishes = dishes.map((item)=>{
    //   return item.id === id ? {...item, quantity : 0} : item
    // })
    // setDishes(updateDishes);
    // console.log('updateDishes',updateDishes)

    //quantity minus in total cart count
    const removedItems = dishes.find((item)=> item.id == id);
    if (removedItems) {
      setCount(count - removedItems.quantity);
    }      
    try {
      if (token) {
        const response = await axios.patch(`${url}/cart/removeFood`, {itemId :id },{
        headers : {token}
         })
         console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }

   }

  const handlegetCartData = async (token) => {
    if (token) {
      var response = await axios.get(`${url}/cart/getAllCart`,{
        headers : {token}
      });
    }
    setCartData(response.data.cartData);
    console.log('cart',response.data.cartData);
  }

  const CartTotalPrice = () => {
    let total = 0,deliveryCharges=40;
    dishes.forEach((item)=>{
      if (cartData[item._id]>0) {
         total += item.price * cartData[item._id] 
      }
    })
    total+=deliveryCharges;

    return total;

  }
  

  const contextValue = {
    handleDecrement,
    handleIncrement,
    handleRemoveItem,
    count,
    cartData,
    dishes,
    url,
    settoken,
    token,
    handlegetCartData,
    CartTotalPrice,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
