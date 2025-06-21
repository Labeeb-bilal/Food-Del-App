import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ItemList.css'
import { toast } from 'react-toastify';

export default function ItemList({url})  {
  const [List, setList] = useState([]);

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async () => {
    const response = await axios.get(`${url}/food/getAllFoodList`);
    setList(response.data.data);
  }

  const handleDeleteById = async (id) => {
    try {
      const response = await axios.delete(`${url}/food/delete/${id}`);
      console.log(response.data.data);
      fetchData()
      toast.success(response.data.data);
    } catch (error) {
      toast.error(error.response.data.data);
    }

  }
  return (
    <div>
<table className="table">
  <thead>
    <tr>
      <th>item Num</th>
      <th>Name</th>
      <th className='des'>Description</th>
      <th>Image</th>
      <th className='catagory'>Category</th>
      <th>Price</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
    {List.length > 0 ? (
      List.map((item, index) => (
        <tr key={index}>
          <td>{index+1}</td>
          <td>{item.name}</td>
          <td className='des'>{item.description}</td>
          <td>
            <img src={`https://food-del-backend-8dxk.onrender.com${item.image}`} alt={item.name} width="60" />
          </td>
          <td className='catagory'>{item.catagory}</td>
          <td>{item.price}</td>
          <td className='trash-btn'><i className="fa-solid fa-trash" onClick={(()=> handleDeleteById(item._id))}></i></td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5">No items found</td>
      </tr>
    )}
  </tbody>
</table>
    </div>
  )
}
