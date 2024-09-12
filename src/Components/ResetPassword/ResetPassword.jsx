import  { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ResetPassword() {
  let navigate =useNavigate();
  const [isloading, setisloading] = useState(false)
  const [errorMessage, seterrorMessage] = useState('')

  async function handelResetPassword(values) {
    setisloading(true);
try {
  let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
  setisloading(false)
  toast.success('Change Password Successfully')
  navigate('/')
setisloading(false)
} catch (error) {
//  toast.error('');
}

 
}
  
  let validationSchema=Yup.object({
  
    email:Yup.string().required('Email is required').email('Email is invalid'),  
    newPassword:Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start uppercase...')
  })


let formik = useFormik({

  initialValues:{

   email:'',
   newPassword:''
 

  },
  validationSchema,
  onSubmit: handelResetPassword
});






  return <>
    <Helmet>
        <title>Reset</title>
      </Helmet>
     <div className='col-md-5 mx-auto  p-4 bg-main-light rounded-4'>


      <h4 className='mb-4 text-main'>Reset New Password <i className="fa-solid fa-gears"></i></h4> 
      {errorMessage.length > 0? <div className='alert alert-danger'>
        {errorMessage}
      </div>:null}

      <form onSubmit={formik.handleSubmit}>
     
     
     
      <label htmlFor="email">Email:</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id="email"/>
      {formik.errors.email && formik.touched.email? <div className='alert alert-danger'>{formik.errors.email}</div>:null}
     
      <label htmlFor="newPassword">New Password:</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.newPassword} type="newPassword" name='newPassword' id="newPassword"/>
      {formik.errors.newPassword && formik.touched.newPassword? <div className='alert alert-danger'>{formik.errors.newPassword}</div>:null}

     {isloading? <button  type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:
     <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Reset Password</button>}
      </form>
     
      
     </div>
    </>
  
}

