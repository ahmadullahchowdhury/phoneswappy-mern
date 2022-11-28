import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { fireAuthContext } from "../../Context/Context";

const Header = () => {
  const { user, userSingOut } = useContext(fireAuthContext);

  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [ userdata, setUserData] = useState('')
  const  navigate = useNavigate()


  const handleSignOut = () => {
    userSingOut()
      .then(() => {

        navigate("/login")
      })
      .catch((error) => {
        // An error happened.
      });
      navigate(from, {replace: true})
  };






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
            <>
          <Link to="/dashboard" className="btn">
            Dashboard
          </Link>
          <Link to="/blog" className="btn">
              Blog
            </Link>
            </>

            {/* <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 3</a>
            </li> */}


 
          </ul>
        </div>
        <div className="navbar-end">
            {
                user?.email ? (
                    <>
                                    <Link onClick={handleSignOut} className="btn">
              Log out
            </Link>
                    </>
                ) : (
                    <>
                             <Link to="/login" className="btn">
            Login
          </Link>
          <Link to="/register" className="btn">
            Register
          </Link>
                    </>
                )
            }
 
        </div>
      </div>
    </div>
  );
};

export default Header;
