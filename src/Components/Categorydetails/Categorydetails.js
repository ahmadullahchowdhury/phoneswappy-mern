import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { fireAuthContext } from "../../Context/Context";

const Categorydetails = () => {
    const { user } = useContext(fireAuthContext)
  const [products, setProducts] = useState([]);
  const [productSingle, setProductSingle] = useState('');
  const data = useLoaderData();

  useEffect(() => {
    fetch(
      `http://localhost:5000/product?product_category_id=${data.category_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [data.category_id]);

  console.log(productSingle)
  return (
    <div>
      <h1>This is </h1>
      {
        <div className="grid grid-cols-1  md:grid-cols-3 content-center ">
          {products.map((product) => (
            <div key={product._id} className=" card w-96 bg-base-100 shadow-xl">
              <figure>
                <img className="w-32 h-32" src={product.img} alt="Shoes" />
              </figure>
              <div className="card-body">
                <h2 className="text-3xl font-semibold text-center">
                  {product.product_name}
                </h2>
                <h2 className="">
                  Seller Name: {product.seller_name}
                  <div className="badge badge-secondary m-3">
                    {product.is_verified === "true" ? "Verified" : "X"}
                  </div>
                </h2>
                <h2 className="">
                  Seller Location: {product.product_location}
                </h2>
                <p>Date Posted: {product.product_posted_date}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">
                    Resale Price: {product.product_resale_price}
                  </div>
                  <div className="badge badge-outline">
                    Original Price: {product.product_original_price}
                  </div>
                </div>
                <label onClick={ () => setProductSingle(product)} htmlFor="my-modal-6" className="btn btn-accent">
                  Book Now
                </label>
              </div>
            </div>
          ))}
        </div>
      }

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
          {productSingle.product_name}
          </h3>
          <h1>Your Name:{user.displayName}</h1>
          <h1>Your Email:{user.email}</h1>
          <h1>Resale Price:{productSingle.product_resale_price}</h1>
              <h1>To Book the Product Please Give Your Location & Phone Number</h1>
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                name="phone_number"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Meeting Location</span>
              </label>
              <input
                type="password"
                placeholder="Meeting Location"
                name="meeting_location"
                className="input input-bordered"
              />
              <p className="text-orange-700 p-3"></p>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary m-2">Confirm Booking</button>
            </div>
          </form>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn btn-warning">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorydetails;
