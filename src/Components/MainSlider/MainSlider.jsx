
import Slider from "react-slick";
import slide1 from "../../assets/images/grocery-banner.png";
import slide2 from "../../assets/images/grocery-banner-2.jpeg";
import slide3 from "../../assets/images/slider-2.jpeg";
import img1 from "../../assets/images/banner-4.jpeg";
import { Link } from "react-router-dom";
export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-7 my-2 col-sm-12">
          <div className=" position-relative ">
            <img src={img1} className="w-100 rounded-2 " />
            <div className="position-absolute top-0 start-0 ">
              <h4 className="ms-3 fw-bolder mt-5 text-white col-md-12">
                Best Online <br /> Deals, Free Stuff
              </h4>
              <button className="btn-danger btn ms-3 mt-1 btn-home">
                <Link to={"/products"} className="text-white btn-inner fw-bold">
                  {" "}
                  Shop Now
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-sm-12 my-2 text-c">
          <Slider {...settings} className="">
            <div className="">
              <div className=" position-relative">
                <img
                  src={slide2}
                  height={190}
                  alt=""
                  className="100 rounded-2"
                />
                <div className="position-absolute top-0 start-0">
                  <h6 className="mt-5 ms-3 dark-blue">
                    Freshly Baked Buns <br />
                    Get Upto 25% off
                  </h6>
                </div>
              </div>
              {/* <div className='col-md-3'>
                <img src={slide2} alt="" className='w-100'/>
                <img src={slide3} alt="" className='w-100'/>

              </div> */}
            </div>

            <div className="">
              <div className="k position-relative">
                <img
                  src={slide1}
                  height={190}
                  alt=""
                  className="100 rounded-2"
                />
                <div className="position-absolute top-0 start-0">
                  <h6 className="mt-5 ms-3 dark-blue">
                    Fruits & Vegetables <br />
                    Get Upto 30% off <br />
                  </h6>
                </div>
              </div>
              {/* <div className='col-md-3'>
                <img src={slide3} alt="" className='w-100'/>
                <img src={slide1} alt="" className='w-100'/>

              </div> */}
            </div>
            <div className="">
              <div className="k position-relative">
                <img
                  src={slide3}
                  height={190}
                  alt=""
                  className="100 rounded-3"
                />
                <div className="position-absolute top-0 start-0">
                  <h6 className="mt-5 ms-3 dark-blue">
                    Say yes to <br />
                    season’s fresh <br />
                    <i className="fa-solid fa-pepper-hot ms-2"></i>
                    <i className="fa-solid fa-carrot"></i>
                  </h6>
                </div>
              </div>
              {/* <div className='col-md-3'>
                <img src={slide2} alt="" className='w-100'/>
                <img src={slide3} alt="" className='w-100'/>

              </div> */}
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}
