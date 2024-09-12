
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState } from "react";

export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  async function handelLogin(values) {
    setisloading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((errr) => {
        setisloading(false);
        seterrorMessage(
          `${errr.response.data.errors.param} : ${errr.response.data.errors.msg}`
        );
      });

    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      saveUserData();
      setisloading(false);
      navigate("/");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password must start uppercase..."),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="col-md-5 mx-auto mt-2 p-4 bg-main-light rounded-4 ">
        <h4 className="mb-4 text-main">
          Login Now <i className="fa-solid fa-arrow-right-to-bracket"></i>
        </h4>
        {errorMessage.length > 0 ? (
          <div className="alert alert-danger">{errorMessage}</div>
        ) : null}

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password:</label>
          <input
            onBlur={formik.handleBlur}
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : null}
          <div className="d-flex justify-content-between mb-3">
            <Link to={"/register"} className="col-md-3 text-main">
              {" "}
              Register
            </Link>

            <Link to={"/forgetPassword"} className="col-md-3 text-main">
              {" "}
              ForgetPassword
            </Link>
          </div>

          {isloading ? (
            <button type="button" className="btn bg-main text-white">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
