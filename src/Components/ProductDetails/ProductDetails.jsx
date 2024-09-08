import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Slider from "react-slick";
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';
import Footcol from '../Footcol/Footcol';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function ProductDetails() {
  let {addToCart ,setnumOfCartItems} = useContext(cartContext);
  const [productsDetails, setProductsDetails] = useState(null)
  let params =useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  async function addProduct(productId) {


    let response = await addToCart(productId);
   
    if (response?.data?.status === 'success') {
      toast.success(response.data.message,{duration:2000})
      setnumOfCartItems(response.data.numOfCartItems);
      
    }
    else{
     // toast.error('Error',{duration:2000})
  
    
    }
  
  }
  async function getProductDetails(id) {
  
    

   let {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
   setProductsDetails(data.data)
  }
  useEffect(()=>{
    getProductDetails(params.id);
  },[])

    
  return <>
<Helmet>
ProductDetails
</Helmet>

{productsDetails != null ? 


<div className='row py-3 align-items-center'>

<div  className='col-md-4'>

<Slider {...settings}>
{productsDetails?.images.map((img)=> <img src={img} alt="" className=''/>)}
 </Slider>
 
</div>  


 <div className='col-md-8' key={productsDetails?._id}>
   <h3>{productsDetails?.title}</h3>
   <p className='text-muted p-2'>{productsDetails?.description}</p>
   <div className='d-flex justify-content-between'>
     <span className='text-muted'>{productsDetails?.price} EGP</span>
     <span className=''>
       <i className='fas fa-star rating-color'></i>
       {productsDetails?.ratingsAverage}|Rating</span>

   </div>

   <button className=' btn bg-main text-white w-100 mt-4'onClick={()=> addProduct(productsDetails._id)}> Add to Cart</button>

 </div>


</div>
:<LoadingScreen/>}

    
      <Footcol/>
    </>








  
  
}
