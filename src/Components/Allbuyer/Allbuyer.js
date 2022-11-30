import React, { useEffect, useState } from 'react';

const Allbuyer = () => {
    const [buyers, setBuyers] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:5000/usersingle?userRole=Buyer`)
        .then((res) => res.json())
        .then((data) => {
            setBuyers(data);
        });
    }, []);
  
    console.log(buyers);
    return (
        <div>
        <h1  className="text-3xl text-bolder m-4"> All Seller is here</h1>
        <div className="grid grid-cols-1 justify-center">
       {
          buyers.map(buyer => <div className='flex justify-center'>
  
  <p className="m-2 border-2 rounded-xl p-2 border-indigo-600">{buyer.name}</p>
  <p className="m-2 border-2 rounded-xl p-2 border-indigo-600 ">{buyer.email}</p>
  <p className="btn  btn-error">Delete Buyer</p>
  
          </div> )
       }
  
        </div>
      </div>
    );
};

export default Allbuyer;