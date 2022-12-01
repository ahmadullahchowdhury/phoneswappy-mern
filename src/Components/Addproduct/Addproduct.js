import React, { useContext, useState } from "react";
import { fireAuthContext } from "../../Context/Context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";

const Addproduct = () => {
    const navigate = useNavigate();
  const { user } = useContext(fireAuthContext);
  const [catNo, setCatNo] = useState("01");
  const [catName, setCatName] = useState("Smart Phone");

  const addProduct = (e) => {
    e.preventDefault();
    const pname = e.target.pname.value;
    const rPrice = e.target.rPrice.value;
    const oPrice = e.target.oPrice.value;
    const location = e.target.location.value;
    const img = e.target.img.value;
    const usage = e.target.usage.value;

    const newProduct = {
      img: img,
      product_name: pname,
      product_location: location,
      product_resale_price: rPrice,
      product_original_price: oPrice,
      product_years_of_use: usage,
      product_posted_date: new Date()
        .toJSON()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("-"),
      seller_id: "p3",
      seller_email: user.email,
      seller_name: user.displayName,
      is_verified: "false",
      product_category_name: catName,
      product_category_id: catNo,
      is_sold: "false",
    };

    console.log(newProduct);

    fetch("https://phone-resale-server.vercel.app/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success("Product added Successfully", { autoClose: 1000 });
          navigate("/dashboard/myproducts");
        })
        .catch((err) => console.error(err));
  };

  const catNoSelector = (value) => {
    setCatNo(value);
  };

  const catNameSelector = (value) => {
    setCatName(value);
  };

  return (
    <div>
      <h1>This is addproduct</h1>
      <div className="w-2/4 mx-auto">
        <form onSubmit={addProduct} className="card-body">

          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              name="pname"
              placeholder="Product Name"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Resale Price</span>
            </label>
            <input
              type="text"
              name="rPrice"
              placeholder="Resale Price"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Original Price</span>
            </label>
            <input
              type="text"
              name="oPrice"
              placeholder="Original Price"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Image</span>
            </label>
            <input
              type="text"
              name="img"
              placeholder="Product Image"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">years of use</span>
            </label>
            <input
              type="text"
              name="usage"
              placeholder="years of use"
              className="input input-bordered"
              required
            />
          </div>

          <select
            onChange={(event) => catNoSelector(event.target.value)}
            value={catNo}
            className="select w-full max-w-xs"
            required
          >
            <option disabled selected>
              Select Category No
            </option>
            <option>01</option>
            <option>02</option>
            <option>03</option>
          </select>
          <select
            onChange={(event) => catNameSelector(event.target.value)}
            value={catName}
            className="select w-full max-w-xs"
            required
          >
            <option disabled selected>
              Select Category Name
            </option>
            <option>Smart Phone</option>
            <option>Feature Phone</option>
            <option>Tablet</option>
          </select>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Add Product</button>
          </div>
          <ToastContainer autoClose={1000} />
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
