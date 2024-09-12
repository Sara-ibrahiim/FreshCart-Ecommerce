import  { useContext } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";

export default function Navbar({ userData, clearUserData }) {
  let { numOfCartItems, wishListNumber } = useContext(cartContext);

  let navigate = useNavigate();
  function logoutUser() {
    clearUserData();
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light ">
        <div className="container">
          <Link className="navbar-brand cursor-pointer" to="/">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userData !== null ? (
              <ul className="navbar-nav me-auto mt-4 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link nav" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav" to="categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav" to="products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav" to="brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav" to="allorders">
                    Orders
                  </Link>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {userData == null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {/* <li className="nav-item d-flex align-items-center me-3">
                <i className="fab mx-2 fa-facebook" ></i>
                <i className="fab mx-2 fa-instagram" ></i>
                
              </li> */}

                  <li className="nav-item position-relative pt-2 mt-1">
                    <Link className="nav-link" to="cart">
                      <i className="fas fa-shopping-cart fa-xl mt-2 pt-1"></i>
                      <span className="badge position-absolute top-0 end-0 wish-badge   mb-2 ms-5 bg-main text-white">
                        {numOfCartItems}
                      </span>
                    </Link>
                  </li>

                  <li className="nav-item mx-2 pt-2 position-relative">
                    <Link to="wishlist" className="nav-link position-relative">
                      <i className=" text-secondary fa-regular fa-heart fa-xl fw-light mt-3"></i>
                      <span className="  text-main WISH badge position-absolute  top-0 bottom-5 wish-badge end-0  mb-2 ms-5 bg-main text-white">
                        {wishListNumber}
                      </span>
                    </Link>
                  </li>

                  <li className="  logout rounded-2 nav-item mt-2 ">
                    <Link
                      onClick={logoutUser}
                      className="nav-link text-secondary"
                    >
                      Logout{" "}
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
