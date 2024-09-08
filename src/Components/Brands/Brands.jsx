import axios from 'axios'
import { useEffect, useState } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import Footcol from '../Footcol/Footcol'
import { Helmet } from 'react-helmet'

export default function Brands() {
    const [brands, setBrands] = useState([])
   async function getAllBrands() {
     let {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        setBrands(data.data)
        
    } 
    useEffect(()=>{
        getAllBrands();

       },[])
     return <>
<Helmet>
        <title>Brands</title>
      </Helmet>

     {brands.length > 0?<div className="row mt-3">
        <div className="col-md-3">
            <div className="title pt-4">
                <h3 className=' text-main'>Our Brands</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam eos voluptates beatae placeat iusto labore?</p>
            </div>

        </div>


        {brands?.map((brand)=><div key={brand._id} className='col-md-3'>
          <img src={brand.image} alt="" className='w-100'/>
          <h2 className='my-2 h4 text-main text-center'>{brand.name}</h2>

        </div>)}
    
      
      </div>:<LoadingScreen/>}
      <Footcol/>
    </>
  
}
