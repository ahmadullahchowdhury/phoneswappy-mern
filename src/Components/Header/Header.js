import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { fireAuthContext } from "../../Context/Context";

const Header = () => {
  const { user } = useContext(fireAuthContext);
  
  const [ userdata, setUserData] = useState('')

  //   useEffect(() => {
  //     fetch(`http://localhost:5000/user?email=${user.email}`)
  //   })

  useEffect(() => {
    fetch(`http://localhost:5000/user?email=${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        console.log(data)
      });
  }, [user.email]);

  console.log(userdata.userRole)

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li tabIndex={0}>
                <a className="justify-between">
                  Parent
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <img className=" ml-5 w-7 h-7" src="logo.png" alt="logo"></img>
          <Link to="/" className="btn">
            PhoneSwappy
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal p-0">

            {/* <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 3</a>
            </li> */}
            { userdata?.userRole === 'Buyer' ? (
          <>
            <Link to="/myreview" className="btn">
              My Orders
            </Link>
          </>
        ) : userdata?.userRole === 'Seller' ? (
          <>
            <Link to="/myreview" className="btn">
            Add A product
            </Link>
            <Link to="/addservice" className="btn">
            My Products
            </Link>
            <Link to="/addservice" className="btn">
            My buyers
            </Link>

          </>
        ): (

            <>

            <Link to="/myreview" className="btn">
              All Sellers
            </Link>
            <Link to="/addservice" className="btn">
              All Buyers
            </Link>
            <Link to="/addservice" className="btn">
              Reported Items
            </Link>
            </>
)


 }

 
          </ul>
        </div>
        <div className="navbar-end">
          <Link to="/login" className="btn">
            Login
          </Link>
          <Link to="/register" className="btn">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
