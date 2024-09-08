import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let cartContext = createContext();
export function CartContextProvider(props) {
  const [dataWishList, setDataWishList] = useState([]);
  const [wishListNumber, setWishListNumber] = useState();
  const [cartId, setcartId] = useState(null);
  const [numOfCartItems, setnumOfCartItems] = useState(0);

  async function getCart() {
    let response = await getLoggedUseCart();
    if (response?.data?.status === "success") {
      setnumOfCartItems(response.data.numOfCartItems);
      setcartId(response.data.data._id);
    }
  }

  useEffect(() => {
    getCart();
  }, []);
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        setnumOfCartItems(response.data.numOfCartItems);
        toast.success("Add Successfully In Cart");
      })
      //.catch((error) => error);
  }

  function getLoggedUseCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
     // .catch((error) => error);
  }
  function removeItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  function updateProductCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response);
  }
  function ClearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,

        {
          shippingAddress: shippingAddress,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function addToWishList(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function getWishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.data.length) {
          let wishNum = response.data.data.length;
          if (wishNum === 0) {
            wishNum = "";
          }
          setWishListNumber(wishNum);
        }

        return response;
      })
      .catch((error) => error);
  }

  function deleteWishList(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <cartContext.Provider
      value={{
        deleteWishList,
        ClearCart,
        setDataWishList,
        dataWishList,
        cartId,
        numOfCartItems,
        addToCart,
        setWishListNumber,
        setnumOfCartItems,
        getLoggedUseCart,
        headers,
        wishListNumber,
        removeItem,
        updateProductCount,
        onlinePayment,
        addToWishList,
        getWishList,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
