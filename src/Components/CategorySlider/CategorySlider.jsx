import { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios';


export default function CategorySlider() {


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };


  const [categories, setCategories] = useState([])
  async function getCategories() {
  
    

   let {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   setCategories(data.data)
  }
  useEffect(()=>{
    getCategories();
  },[])

  return <>
      
      <Slider {...settings} className='mt-5'>
       {categories.map((category)=> <div className=' mx-2' key={category._id}>
        <img src={category.image} alt="" className='w-75 border p-2 category-img rounded-2 border-success ' height={150} />
        <h2 className='h6 pt-2 category-name'>{category.name}</h2>

       </div>)}
      </Slider>
    </>
  
}
