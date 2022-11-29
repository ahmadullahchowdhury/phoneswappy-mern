import React, { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";

const Categorydetails = () => {
  const [products, setProducts] = useState([]);
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
                <label htmlFor="my-modal-6" className="btn">
                  open modal
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
            Congratulations random Internet user!
          </h3>
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">{}</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="input input-bordered"
              />
              <p className="text-orange-700 p-3"></p>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary m-2">Submit</button>
            </div>
          </form>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categorydetails;
