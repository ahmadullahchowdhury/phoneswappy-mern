import React, { useState, useEffect } from "react";

const Allseller = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/usersingle?userRole=Seller`)
      .then((res) => res.json())
      .then((data) => {
        setSellers(data);
      });
  }, []);

  console.log(sellers);

  return (
    <div>
      <h1  className="text-3xl text-bolder m-4"> All Seller is here</h1>
      <div className="flex justify-center">
     {
        sellers.map(seller => <>

<p className="m-2 rounded-xl p-2 border-2 border-indigo-600">{seller.name}</p>
<p className="m-2 rounded-xl p-2 border-2 border-indigo-600">{seller.email}</p>
<p className="btn  btn-error">Delete Seller</p>

        </> )
     }

      </div>
    </div>
  );
};

export default Allseller;
