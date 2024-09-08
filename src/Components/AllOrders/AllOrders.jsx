import axios from "axios";
import  { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import Footcol from "../Footcol/Footcol";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function AllOrders() {
  const [allOrders, setallOrders] = useState([]);
  function getAllOrders() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      return axios
        .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
        .then((response) => {
          setallOrders(response.data);
        })
        .catch((error) => error);
    }
  }

  // async function getAllOrders(){

  //  let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userData.id}`)
  //   setallOrders(data)
  //   console.log(data)

  // }

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      {allOrders.length>0 ? (
        <div className="row mt-5">
          {allOrders.map((order) => (
            <div className="col-md-3 bg-main-light p-3" key={order._id}>
              <div className="orders">
                <p>This order</p>
                <p>{order?.product.title}</p>
                <h5>price: {order?.totalOrderPrice} </h5>
                <h5>Order: {order?.shippingAddress.city} </h5>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <LoadingScreen/>
      )}

      <Footcol />
    </>
  );
}
