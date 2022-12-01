import React, { useContext, useEffect, useState } from 'react';
import { fireAuthContext } from '../../Context/Context';

const Myproducts = () => {

    const [myProducts , setMyProducts] = useState([])

    const {user } = useContext(fireAuthContext)

    useEffect( () => {
        fetch(`https://phone-resale-server.vercel.app/productseller?seller_email=${user.email}`).then(res => res.json()).then(data => setMyProducts(data))
    } ,[])
    console.log(myProducts);

    return (
        <div className='w-3/4 mx-auto'>
            <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Resale Price Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      
        {
            myProducts.map((product, i) => <>
                  <tr>
        <th>{i+1}</th>
        <td>{product.product_name}</td>
        <td>{product.product_resale_price}</td>
        <td>{
            product?.is_sold === 'true' ? 'Sold' : 'Unsold'
            }</td>
        <td>{
            product?.is_sold === 'true' ? null : <p className='btn btn-info'> Advertise</p>
            }</td>
      </tr>

            </>)
        }

      

    </tbody>
  </table>
</div>
        </div>
    );
};

export default Myproducts;