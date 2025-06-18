import React, { useEffect, useState } from 'react'
import uploadingLogo from '../../assets/cloud-computing.png'
import './AddItem.css' 
import axios from 'axios';
import {toast} from 'react-toastify';
import { useRef } from 'react';

export default function AddItem({url}) {

    const [productData, setproductData] = useState({
        image : '',
        name : '',
        des : '',
        Category : 'Pure veg',
        Price : '0',
    });
    const fileinputref = useRef()

  
 
    const hanldeChange = (e) => {
     const {name,value,files} = e.target;
      setproductData({
        ...productData,
        [name] : files? files[0] : value,
      })
    }

    useEffect(()=>{
        // console.log(productData);
    });

    const handleresetForm = () => {

        fileinputref.current.value = null;
        setproductData({
           image: '',
           name: '',
           des: '',
           Category: '',
           Price: '0',
         });
    }

    const handleSubmit = async (e) => {
       e.preventDefault();

        if (!productData.image) {
            toast.warning("Please upload an image.");
            return;
          }

       const formData = new FormData();

       formData.append('image',productData.image);
       formData.append('name',productData.name);
       formData.append('description',productData.des);
       formData.append('catagory',productData.Category);
       formData.append('price',productData.Price);

       try {
        console.log(formData)
         const response = await axios.post(`${url}/food/Add`,formData);
         setproductData({})
         toast.success('Food Successfully Added');
         handleresetForm();
         
       } catch (error) {
         console.log(error);
         toast.success(response.data);
       }

    }
  return (
    <div>
        <form onSubmit={handleSubmit} className='Add-item-container'>
            <div className='Upload-Box'>
                <p>Upload Image</p>
                <div className='img-box'>
                     <label htmlFor='image'>
                      <img className='upload-logo'  src={ productData.image? URL.createObjectURL(productData.image) : uploadingLogo} />
                     </label>
                    <input id='image' type='file' accept='image/*' name='image' hidden ref={fileinputref} onChange={hanldeChange}/>
                </div>
            </div>

            <div className='product-name-field'>
                <p>Product Name</p>
                <input type='text' name='name' onChange={hanldeChange} required value={productData.name}/>
            </div>

            <div className='product-des-field'>
                <p>Product description</p>
                <textarea rows={5} name='des'  onChange={hanldeChange} value={productData.des}/>
            </div>

            <div className='product-Cat-Price-field'>

                <div className='option-box'>
                  <p>Product Category</p>
                 <select className='option-box-select'  onChange={hanldeChange} name='Category' >
                    <option value='Pure veg'>Pure Veg</option>
                    <option value='Non veg'>Non Veg</option>
                 </select>
                </div>

                <div className='option-box'>
                <p>Product Price</p>
                <input type='number' className='option-box-select' name='Price' onChange={hanldeChange} value={productData.Price}/>
                </div>
            </div>

            <button className='add-btn'>Add</button>
   
        </form>
    </div>
  )
}
