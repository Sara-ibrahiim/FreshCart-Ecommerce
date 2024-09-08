import  { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Footcol from '../Footcol/Footcol';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
export default function Cart() {
let {getLoggedUseCart , removeItem ,updateProductCount,setnumOfCartItems} = useContext(cartContext)
const [cartDetails, setcartDetails] = useState(null)
//,ClearCart


async function getCart(){
  let response = await getLoggedUseCart();
  if (response?.data?.status === 'success') {
    setcartDetails(response.data.data)
    
  }



}
// async function clearProduct() {
//   await ClearCart();

//   toast.error('Shopping Cart Empty');
//   setcartDetails([]);

// }

async function deleteItem(productId){
  let response= await removeItem(productId);
  setcartDetails(response.data.data)
    let cartNumber = response.data.numOfCartItems
  if (cartNumber===0) {
    cartNumber="";
    
  }
  setnumOfCartItems(cartNumber)
  toast('Remove Item Success')
  
}
async function updateCart(productId,count){
  if(count === 0) {
    deleteItem(productId);}
    else{
  let response= await updateProductCount(productId,count);
  setcartDetails(response.data.data)

  toast('Cart Count Update')}
  
}


useEffect(()=>{
  getCart();
},[]);

  return <>
        <Helmet>
               
                <title>Cart</title>

            </Helmet>
      {cartDetails !==null? <div className='bg-main-light p-4 my-4'key={cartDetails.id}>
          <h3>Shop Cart:</h3>
          <h6 className='text-main'>Total Cart Price: {cartDetails.totalCartPrice} EGP</h6>
          {cartDetails.products.map((product)=> <div className='row align-items-center border-bottom py-2'
           key={product.product._id}>
            <div className="col-md-1">
              <img src={product.product.imageCover} alt="" className='w-100'/>
            </div>
            <div className="col-md-11 d-flex justify-content-between">
              <div>
                <h6>{product?.product?.title}</h6>
                <h6 className='text-main'>price : {product.price} EGP</h6>
                <button onClick={()=> deleteItem(product.product._id)} className='btn m-0 p-0'> 
                  <i className='fa-regular text-danger fa-trash-can'></i> Remove</button>
              </div>
              <div>
                <button onClick={()=> updateCart(product.product._id, product.count+1)} 
                 className='btn btn-sm border-main'>+</button>
                <span className='mx-2'>{product?.count}</span>
                <button onClick={()=> updateCart(product.product._id, product.count-1)} 
                 className='btn btn-sm border-danger'>-</button>
              </div>

            </div>

          </div>)}

          <button className='btn bg-main my-2'>
            <Link className='text-white text-decoration-none' to={'/checkOut'}>
              CheckOut
            </Link>
          </button>

          {/* <button className="btn btn-danger mx-3" onClick={clearProduct()}> Clear

          </button> */}




        </div>:<LoadingScreen/>
  
      }
            <Footcol />
    </>
  
}
