import React from "react";
import { useLoaderData, Link } from "react-router-dom";

const Home = () => {
  const catData = useLoaderData();
  console.log(catData);
  return (
    <div>
      <div className="w-4/5 mx-auto">
        <div className="carousel w-full">
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://i.ibb.co/x1hT1nw/banner-1jpg.jpg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://i.ibb.co/34CSVp1/banner-3jpg.jpg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-4xl text-bolder m-3">
        Catagories that can you shop from
      </h1>
      {catData.map((cat) => (
        <Link to={`/category/${cat._id}`} className="btn btn-primary mx-5">
          {cat.category_name}
        </Link>
      ))}
      <div className="w-3/4 mx-auto">
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage: `url("https://assets.swap.com.bd/mp-category/a87ff679a2f3e71d9181a67b7542122c/banner/phones-accessories.png")`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Welcome to PhoneSwappy</h1>
              <h1 className="mb-5 text-2xl font-bold">A Trusted Place to Buy and Sell phone</h1>
              <p className="mb-5">
              SWAP is the combination of first ever e-commerce and re-commerce marketplace in Bangladesh where customers can purchase anything by personalized orders as well as sell their unneeded/surplus products such as smartphones, laptops, appliances, vehicles, etc. and exchange also.

.
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
