import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ForgetPassword() {
  let navigate =useNavigate();
  const [isloading, setisloading] = useState(false)
  const [errorMessage, seterrorMessage] = useState('')

  async function handelForgetPassword(values) {
  
   
   try {  
    setisloading(true);  
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
    //seterrorMessage(`${errr.response.data.errors.param} : ${errr.response.data.errors.msg}`)
    setisloading(false);
   console.log(data)
    navigate('/verify')
   
   } catch (error) {
    toast.error('Email address is not found');
   }
  }
  
  let validationSchema=Yup.object({
  
    email:Yup.string().required('Email is required').email('Email is invalid')
  })


let formik = useFormik({

  initialValues:{

   email:'',
  
  },
  validationSchema,
  onSubmit: handelForgetPassword
});






  return <>
     <div className='col-md-5 mx-auto mt-5  p-4 bg-main-light rounded-4'>


      <h4 className='mb-3 text-main'>Forget Password <i className="fa-solid fa-envelope-open-text"></i></h4> 
      {errorMessage.length > 0? <div className='alert alert-danger'>
        {errorMessage}
      </div>:null}

      <form onSubmit={formik.handleSubmit} className=''>
     
     
     
      <label className='my-3' htmlFor="email">Email:</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id="email"/>
      {formik.errors.email && formik.touched.email? <div className='alert alert-danger'>{formik.errors.email}</div>:null}
     
      
     {isloading? <button  type='button' className='btn mt-3 bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:
     <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Send</button>}
      </form>
     
      
     </div>
    </>
  
}

