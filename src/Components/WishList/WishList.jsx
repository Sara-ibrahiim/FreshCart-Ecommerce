import  { useContext, useEffect} from 'react';
import { cartContext } from '../../Context/CartContext';

import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

import Footcol from '../Footcol/Footcol';

export default function WishList() {


  let {getWishList, addToCart, deleteWishList,
    setWishListNumber, setDataWishList, dataWishList} = useContext(cartContext)




  useEffect(()=> {
  (async ()=> {
      let data = await getWishList();
     
        setDataWishList(data.data.data);
        let wishNum = data.data.data.length;
        if(wishNum === 0) {
          wishNum = "";
        }
        setWishListNumber(wishNum);

    
       // console.log(data.data.data)
      // }
   
  })()
  })

  async function addToMyCart(id) {
    await addToCart(id)
  
   
  }

  async function removeProductWishList(id) {
    let data = await deleteWishList(id);
    // console.log(data.data.data.length);
    if(data.status === 200) {
      setDataWishList(data.data.data);
      let wishNum = data.data.data.length;
      if(wishNum === 0) {
        wishNum = "";
      }
      setWishListNumber(wishNum);
    }
    toast.success('Product removed from wishlist');
  }

  return (
    <>

<Helmet>
               
               <title>WishList</title>

           </Helmet>

           {dataWishList.length >0   ? 
           
           <div className='border mt-3'>
           <div className="container">
             <div className="row">
               <div className="col-md-11 ms-3">
     
     
     
     
     
                 
                 <div className='mt-5 mb-3 border-start ps-3 border-bottom'>
                 <h1 className="mb-1 fw-bold text-main"> Wishlist  <i className="fa-solid fa-gift text-main fa-1x"></i></h1>
     
     
                 {dataWishList.length > 0 ?
                 <p>There are {dataWishList.length} products in this wishlist.</p>
                 :
                 ''
               }
                 </div>
                 <div>
                
               
                   {dataWishList.length === 0 ?
                   <h3 className='text-center mt-3'>wishlist Empty</h3>
                   :           
                         <div className="" >
                           {dataWishList.map((data)=> (
     
                             <div key={data?._id} className='w-100 bg-main-light my-3 pe-2 rounded-2'>
                               <div className='d-flex'>
     
                                 <div className='col-md-3'>
                                 <img src={data?.imageCover} alt="" className='w-50 p-1' />
                                 </div>
                               
                                 <div className='d-flex align-items-center col-md-7'>
     
                                   <div className='mx-5 col-md-9'>
                                   <h6 className='mt-3' >{data?.title}</h6>
                                   <p className='text-main'> price: {data?.price} EGP</p>
                                   <p>Quantity: {data?.quantity}</p>
                                   </div>
     
                                   <div className='d-flex flex-column col-md-3 '>
                                   <div className="">
                 <button onClick={()=>{addToMyCart(data?._id)}} className='btn btn-main py-2'><i className='fas fa-shopping-cart'></i> Add to Cart</button>
                 </div>
                 <div className="">
                 <button onClick={()=>{removeProductWishList(data?._id)}} className='btn btn-outline-danger text-center mt-3'>
                         <i className='fa-regular fa-trash-can mx-3'></i> Remove
                   </button>
                 </div>
     
                                   </div>
             
         
     
                                   <div>
     
                                   </div>
                         
                                 </div>
                           
     
                               </div>
     
     
          
     
                             </div>
                           ))}
     
     
     {/*
                       <table className="table">
                       <thead className="table-light">
                     <tr className='bg-main-light shadow'>
                   <th>No.</th>
                   <th></th>
                   <th>Product</th>
                 <th>Price</th>
                   <th>Actions</th>
                 <th>Remove</th>
                 </tr>
                 </thead>
     
     
                 {dataWishList.map((product, index)=>{
                       
                        <tbody key={index}>
     
     
                         <tr>xx</tr>
                <tr className='border-bottom'>
                 <td className="">
                   {index + 1}
                 </td>
                 <td className="">
                   <img src={product.imageCover} className="icon-shape icon-xxl " alt="productCover"/>
                 </td>
                 <td className="">
                   <div>
                     <h5 className=''><Link to={`/productDetails/${product._id}`} className=''>{product.title}</Link></h5>
                     <p>Remaining quantity: {product.quantity}</p>
                   </div>
                 </td>
                 <td className="">{product.price}EGP</td>
                 <td className="">
                 <button onClick={()=>{addToMyCart(product._id)}} className=''>Add to Cart</button>
                 </td>
                 <td className="">
                 <button onClick={()=>{removeProductWishList(product._id)}} className=''>
                         <i className='fa-regular fa-trash-can mx-2'></i>Remove
                   </button>
                 </td>
             </tr>
               </tbody>
             })
           }
                   </table>
                   */}
                     </div>
                     
         } 
                
                 
     
     
                 <div className=" ">
                
             </div>
         
         <div>
               </div>
               </div>
             </div>
             </div>
             
         </div>
         </div>
           : <LoadingScreen/>}

    <Footcol />
     </>
   
  
  )
}
