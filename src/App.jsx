import './App.css';
import Home from './Components/Home/Home';
import { Offline } from "react-detect-offline";
import Layout from './Components/Layout/Layout';
import Cart from './Components/Cart/Cart'; 
import Categories from './Components/Categories/Categories';
import CheckOut from './Components/CheckOut/CheckOut';
import Products from './Components/Products/Products';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import {RouterProvider, createBrowserRouter, createHashRouter} from 'react-router-dom'
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import ProtectedECommerce from './Components/ProtectedECommerce/ProtectedECommerce';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { CartContextProvider } from './Context/CartContext';
import  { Toaster } from 'react-hot-toast';
import AllOrders from './Components/AllOrders/AllOrders';
import Brands from './Components/Brands/Brands';
import WishList from './Components/WishList/WishList';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Verify from './Components/Verify/Verify';

function App() {
  const [userData, setuserData] = useState(null);

  function clearUserData() {
    localStorage.removeItem('userToken')
    setuserData(null)
  }
function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodeToken = jwtDecode(encodedToken)
    setuserData(decodeToken)
    
    
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData()
    }
  }, [])
  
  let routers = createBrowserRouter([
    {path:'', element:<Layout clearUserData={clearUserData} setuserData={setuserData} userData={userData}/>, children:[
      {index:true, element:<ProtectedECommerce><Home /></ProtectedECommerce>},
      {path:'brands', element:<ProtectedECommerce><Brands /></ProtectedECommerce>},
      {path:'allorders', element:<ProtectedECommerce><AllOrders userData={userData}/></ProtectedECommerce>},
      {path:'productDetails/:id', element:<ProtectedECommerce><ProductDetails /></ProtectedECommerce>},
      {path:'cart', element:<ProtectedECommerce><Cart /></ProtectedECommerce>},
      {path:'wishlist', element:<ProtectedECommerce><WishList /></ProtectedECommerce>},
      {path:'checkOut', element:<ProtectedECommerce><CheckOut /></ProtectedECommerce>},
      {path:'products', element:<ProtectedECommerce><Products /></ProtectedECommerce>},
      {path:'categories', element:<ProtectedECommerce><Categories /></ProtectedECommerce>},

      {path:'login', element:<Login saveUserData={saveUserData}/>},
      {path:'register', element:<Register />},
      {path:'forgetPassword', element:<ForgetPassword/>},
      {path:'verify', element:<Verify/>},
      {path:'resetpassword', element:<ResetPassword/>},
      
      {path:'*',  element:<ProtectedECommerce><NotFound /></ProtectedECommerce>},
   
      
    ] }
  ])
  return<CartContextProvider>
    
    <Offline><div className='network'>Only shown offline (surprise!)</div></Offline>
    <Toaster/>
   <RouterProvider router={routers}></RouterProvider>
  </CartContextProvider>

  

 
}

export default App;
