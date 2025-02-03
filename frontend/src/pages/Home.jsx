import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import {handleSuccess} from '../utils';
import {ToastContainer} from 'react-toastify'

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState('');
  const naviagte = useNavigate();
  useEffect(()=>{
    
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  },[]);

  const handleLogout = (e) =>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('user loggedout');
    setTimeout(() => {
      naviagte('/login');
    }, 1000);
  }

  const fetchProducts = async () =>{
    try {
      const url = 'http://localhost:7000/products';
      const headers = {
        headers:{
          'Authorization':localStorage.getItem('token')
        }
      }
      const response = await fetch(url,headers);
      
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
        console.log(error);
    }
  }


  useEffect(()=>{
    fetchProducts();
  },[])
  return (
    <div>
      <h3>{loggedInUser}</h3>


      <button onClick={handleLogout} >Logout</button>
      <div>
        {
          products && products?.map((item,index)=>{
            return <ul key={index}>
              <li>{item.name}</li>
              <li>{item.price}</li>
            </ul>
          })
        }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
