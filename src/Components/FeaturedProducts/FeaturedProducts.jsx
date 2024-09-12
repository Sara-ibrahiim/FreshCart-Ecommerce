
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Footcol from '../Footcol/Footcol';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
export default function FeaturedProducts() {
  let {addToCart ,setnumOfCartItems,getWishList, deleteWishList, 
    setWishListNumber, setDataWishList, addToWishList} = useContext(cartContext);
  const [products, setProducts] = useState([])
  const [matchingProductIds] = useState([]);
async function addProduct(productId) {


  let response = await addToCart(productId);
 
  if (response?.data?.status === 'success') {
    toast.success(response.data.message,{duration:2000})
    setnumOfCartItems(response.data.numOfCartItems);
    
  }
  else{
    //toast.error('Error',{duration:2000})

  
  }

}

  async function getProducts() {
  
   let {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    setProducts(data.data)
    getWishList()
  }
  useEffect(()=>{
    getProducts();
  },[])

  async function addToMyWishList(e, id) {
    if(!matchingProductIds.includes(id)) {
      e.target.classList.replace('fa-regular', 'fa-solid' );
      let {data} = await addToWishList(id);
      // console.log(data.data.length);
      if(data.status === 'success') {
        toast.success(data.message);
        setWishListNumber(data.data.length);
    }
    }else {
      e.target.classList.replace('fa-solid', 'fa-regular' );
      let data = await deleteWishList(id);
      // console.log(data.data.data.length);
      if(data.status === 200) {
        setDataWishList(data.data.data);
        setWishListNumber(data.data.data.length);
        toast.error('Product removed from wishlist');
      }
}
} 
  return <>

  {products.length> 0 ? 
  
  <div className=' row mt-5'>
  {products.map((product)=> <div key={product._id} className='col-md-2'>
    <div className='product px-2 pb-3 cursor-pointer'>
    <div className='d-inline float-end wish-icon mt-1'>
          <button onClick={(e)=>{addToMyWishList(e,product._id)}} className='btn-whish'>
            <i className={`fa-${matchingProductIds.includes(product._id) ? 'solid' : 'regular'} fa-heart icon fs-5`} ></i>
          </button>
          </div>
      <Link to={`/productDetails/${product._id}`} className='text-decoration-none'>
      
      <img src={product.imageCover} alt="" className='w-100' />
      <span className='text-main fw-bold font-sm'>{product.category.name}</span>
      
      <h3 className='h6   text-dark fw-light'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
      <div className='d-flex justify-content-between'>
        <span className='text-muted'>{product.price} EGP</span>
        <span className='text-dark'>
          <i className='fas fa-star rating-color'></i>
          {product.ratingsAverage}</span>

      </div>      
      </Link>
      
      <button onClick={()=> addProduct(product._id)} className='btn bg-main text-white w-100 mt-1'>+ Add</button>
    </div>
  </div>  )}

 </div>
  : <LoadingScreen/>}
    
     <Footcol/>
    </>
  
}
