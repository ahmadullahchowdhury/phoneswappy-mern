import React, { useContext, useEffect, useState } from "react";
import { fireAuthContext } from "../../Context/Context";
import {
  NavLink,
  Link,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";

const Dashboard = () => {
  const { user, userSingOut  } = useContext(fireAuthContext);
  const [userdata, setUserData] = useState("");
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    fetch(`https://phone-resale-server.vercel.app/user?email=${user?.email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        console.log(data);
        setLoading(false)
        
      });
  }, [user?.email]);
  

  console.log(userdata.userRole);

  return (
    <div>
        {
                loading? 
                  <button className="btn loading">loading</button> : null
                
        }
      {userdata?.userRole === "Buyer" ? (
        <>
          <Link to="/dashboard/myorders" className="btn">
            My Orders
          </Link>
        </>
      ) : userdata?.userRole === "Seller" ? (
        <>
          <Link to="/dashboard/addproduct" className="btn">
            Add A product
          </Link>
          <Link to="/dashboard/myproducts" className="btn">
            My Products
          </Link>
          <Link to="/dashboard/mybuyers" className="btn">
            My buyers
          </Link>
        </>
      ) : userdata?.userRole === "Admin" ? (
        <>
          <Link to="/dashboard/allseller" className="btn">
            All Seller
          </Link>
          <Link to="/dashboard/allbuyer" className="btn">
            All Buyer
          </Link>
          <Link to="/dashboard/reporteditems" className="btn">
            Reported Items
          </Link>
        </>
      ) : 
        null
      }
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;
