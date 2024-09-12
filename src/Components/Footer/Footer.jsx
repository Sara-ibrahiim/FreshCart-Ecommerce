
import app from '../../assets/images/app.png'
import payments from '../../assets/images/payments.png'

export default function Footer() {
  return <>
  <div className="bg-main-light mt-2 vh-50">
  <div className="container">
      <div className="row py-3">
            <h2>Get the Fresh App</h2>
            <p> we will send you a link, open it on your phone to download the app.</p>
    
       
        <div className="col-md-10 my-1">
            <input type="text" className="form-control" name="" id="" placeholder="Email.."/>
    
        </div>
        <div className="col-md-2 my-1">
            <button className="btn bg-main text-white">share app link</button>
        </div>
        <hr className="my-2"/>

        <div className="col-md-6 d-flex align-items-center">
            <p className="w-50 mb-0">Payments partners</p>
            <img src={payments} className="w-50" alt=""/>
        </div>

        <div className="col-md-6 d-flex align-items-center">
            <p className=" w-50 mb-0">Get deliveries with Freshcrat </p>
            <img src={app} className="w-50" alt=""/>

        </div>
    </div>
    </div>
    </div>
    </>
  
}
