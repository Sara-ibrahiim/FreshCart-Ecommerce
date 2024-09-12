import  { useState } from 'react'
import { useFormik} from 'formik';
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false)
  const [errorMessage, seterrorMessage] = useState('')
   
  async function handelRegister(values) {
    
    setisloading(true);
   let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((errr)=>{
    setisloading(false)
    seterrorMessage(`${errr.response.data.errors.param}:${errr.response.data.errors.msg}`)

    //console.log(response.data)

   });


  
   
   if(data.message === 'success'){

    setisloading(false); 
    navigate('/login') 

   }
  
  }




  let validationSchema=Yup.object({
    name:Yup.string().required('Name is required').min(3, 'Name minlength is 3').max(10 ,'Name maxlength is 10'),
    email:Yup.string().required('Email is required').email('Email is invalid'),  
    password:Yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start uppercase...'),
    rePassword:Yup.string().required('RePassword is required').oneOf(([Yup.ref('password')]),'Password and RePassword does not match'),
    phone:Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Phone must be number vaild'),
  })

  // function validate(values) {
  //   let errors={};


  //   return errors
    
  // }

let formik = useFormik({

  initialValues:{
   name:'',
   email:'',
   password:'',
   rePassword:'' ,
   phone:'', 

  },
  validationSchema,
  onSubmit:handelRegister
});






  return <>
  <Helmet>
        <title>Register</title>
      </Helmet>
     <div className='col-md-5 mx-auto p-4 bg-main-light rounded-4'>


      <h4 className='mb-4 text-main'>Register Now <i className="fa-regular fa-address-card"></i></h4>
      {errorMessage.length > 0? <div className='alert alert-danger'>
        {errorMessage}
      </div>:null}

      <form onSubmit={formik.handleSubmit}>
     
      <label htmlFor="name">Name:</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.name} type="text" name='name' id="name"/>
      {formik.errors.name && formik.touched.name? <div className='alert alert-danger'>{formik.errors.name}</div>:null}
     
      <label htmlFor="email">Email:</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id="email"/>
      {formik.errors.email && formik.touched.email? <div className='alert alert-danger'>{formik.errors.email}</div>:null}
     
      <label htmlFor="password">Password:</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id="password"/>
      {formik.errors.password && formik.touched.password? <div className='alert alert-danger'>{formik.errors.password}</div>:null}
      <label htmlFor="rePassword">Repassword:</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.rePassword} type="password" name='rePassword' id="rePassword"/>
      {formik.errors.rePassword && formik.touched.rePassword? <div className='alert alert-danger'>{formik.errors.rePassword}</div>:null}
     
      <label htmlFor="phone mb-3">Phone:</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2' onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id="phone"/>
      {formik.errors.phone && formik.touched.phone? <div className='alert alert-danger'>{formik.errors.phone}</div>:null}
     {isloading? <button  type='button' className='btn mt-4 bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button>:
     <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}
      </form>
     
      
     </div>
    </>
  
}
