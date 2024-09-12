
import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Verify() {
  let navigate =useNavigate();
  const [isloading, setisloading] = useState(false)
  const [errorMessage, seterrorMessage] = useState('')

  async function handelverify(values) {



    setisloading(true);



    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
        setisloading(false)
        navigate('/resetpassword')
        toast.success('Code Send Successfully')
    } catch (error) {
      toast.error('Oops! Verification code is incorrect');
    }

  }
  
  let validationSchema=Yup.object({
  
    resetCode:Yup.string().required('resetCode is required')
  })


let formik = useFormik({

  initialValues:{
    resetCode:'',
  },
  validationSchema,
  onSubmit:handelverify
});






  return <>
  <Helmet>
        <title>Verify</title>
      </Helmet>
     <div className='col-md-5 mx-auto mt-5  p-4 bg-main-light rounded-4'>


      <h4 className='mb-3 text-main'>Verify <i className="fa-regular fa-keyboard"></i></h4> 
      {errorMessage.length > 0? <div className='alert alert-danger'>
        {errorMessage}
      </div>:null}

      <form onSubmit={formik.handleSubmit} className=''>
     
     
     
      <label className='mb-2' htmlFor="resetCode">Send Code</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.resetCode} type="text" name='resetCode' id="resetCode"/>
      {formik.errors.resetCode && formik.touched.resetCode? <div className='alert alert-danger'>{formik.errors.resetCode}</div>:null}
     
      
     {isloading? <button  type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:
     <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Send</button>}
      </form>
     
      
     </div>
    </>
  
}

