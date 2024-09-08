import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Footcol from "../Footcol/Footcol";
export default function Categories() {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCategories(data.data);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      {categories.length > 0 ? (
        <div className="row mt-4 g-2">
          {categories.map((category) => (
            <div key={category._id} className="col-md-4 ">
              <div className="border m-2 rounded-4">
                <img
                  src={category.image}
                  alt=""
                  className="w-75 px-1"
                  height={300}
                />
                <h2 className="my-2 h4 text-main text-center ">
                  {category.name}
                </h2>
              </div>
            </div>
          ))}
          <Footcol />
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
