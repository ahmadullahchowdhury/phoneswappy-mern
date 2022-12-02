import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Allseller = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    fetch(`https://phone-resale-server.vercel.app/usersingle?userRole=Seller`)
      .then((res) => res.json())
      .then((data) => {
        setSellers(data);
      });
  }, [sellers]);

  const handleDelete = ( name, id) => {
    const proceed = window.confirm(`Are you sure to delete this: ${name}`)
    // console.log(proceed)
    
    if(proceed){
        fetch(`https://phone-resale-server.vercel.app/users/${id}`, {
            method: "DELETE" 
        }).then(res => res.json()).then(data => {
            console.log(data)
            toast.success("Deleted Successfully", { autoClose: 1000 });

        }).catch((err) => console.error(err));
        
    }
}

  console.log(sellers);

  return (
    <div>
      <h1  className="text-3xl text-bolder m-4"> All Seller is here</h1>
      <div className="flex justify-center">
     {
        sellers.map(seller => <>

<p className="m-2 rounded-xl p-2 border-2 border-indigo-600">{seller.name}</p>
<p className="m-2 rounded-xl p-2 border-2 border-indigo-600">{seller.email}</p>
<p onClick={ () => handleDelete(seller.name, seller._id)}  className="btn  btn-error">Delete Seller</p>

        </> )
     }

      </div>
      <ToastContainer autoClose={1000}  />
    </div>
  );
};

export default Allseller;
