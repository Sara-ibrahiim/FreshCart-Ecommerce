import  { useContext } from 'react'
import { useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';
import Footcol from '../Footcol/Footcol';
import { Helmet } from 'react-helmet';
export default function CheckOut() {
  let {onlinePayment,cartId} = useContext(cartContext)

//   let navigate = useNavigate();

//   function confirmCashPayment() {
//     const details = document.getElementById('details').value;
//     const phone = document.getElementById('phone').value;
//     const city = document.getElementById('city').value;
//     const shippingAddress = {
//       "shippingAddress":{
//         "details": details,
//         "phone": phone,
//         "city": city
//         }
//     }
//   axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingAddress,
//       {
//       headers: header
//       }
//   ).then((res)=> {
//       if(res.status === 201) {
 
       
//         setnumOfCartItems();
//         setTimeout(()=> {
//           navigate('/allorders')
//         }, 1500)
//       }
//   }).catch((err)=> {
     
 
//   })
// }

  async function handleSubmit(values) {
    let response = await onlinePayment(cartId, values);
    if (response?.data?.status === 'success') 
      
      window.location.href =response.data.session.url;
    // if (response?.data?.status === 'success'){
    //   window.location.href =response.data.session.url;
    // }
    
    
  }
 let formik= useFormik({
  initialValues:{
    details:'',
    city:'', 
    phone:''
  },
  onSubmit:handleSubmit
 })
  return <>

<Helmet>
CheackOut
</Helmet>

   <div className='col-md-6 py-50 mx-auto p-4 bg-main-light rounded-4 '>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="details">Details:</label>
      <input type="text" className='form-control mb-3' value={formik.values.details} onChange={formik.handleChange} name="details" id="details" />
      <label htmlFor="phone">Phone:</label>
      <input type="tel" className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange} name="phone" id="phone" />
      <label htmlFor="city">City:</label>
      <input type="text" className='form-control mb-3' value={formik.values.city} onChange={formik.handleChange} name="city" id="city" />
      <button type='submit'  className='btn bg-main w-100 text-white' onClick={onlinePayment}>Pay</button>
      {/* onClick={()=>{confirmCashPayment()}} */}


    </form>
   </div>

   <Footcol />
    </>
  
}
