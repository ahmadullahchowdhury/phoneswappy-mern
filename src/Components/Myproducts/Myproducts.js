import React, { useContext, useEffect, useState } from 'react';
import { fireAuthContext } from '../../Context/Context';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Myproducts = () => {

    const [myProducts , setMyProducts] = useState([])

    const {user } = useContext(fireAuthContext)

    const handleDelete = ( name, id) => {
        const proceed = window.confirm(`Are you sure to delete this: ${name}`)
        // console.log(proceed)
        
        if(proceed){
            fetch(`https://phone-resale-server.vercel.app/products/${id}`, {
                method: "DELETE" 
            }).then(res => res.json()).then(data => {
                console.log(data)
                toast.success(" Product Deleted Successfully", { autoClose: 1000 });
            }).catch((err) => console.error(err));
            
        }
    }

    useEffect( () => {
        fetch(`https://phone-resale-server.vercel.app/productseller?seller_email=${user.email}`).then(res => res.json()).then(data => setMyProducts(data))
    } ,[myProducts])
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
        <th></th>
        <th></th>
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
            <td><button onClick={  () =>  handleDelete(product.product_name, product._id)} className='btn btn-warning'> Delete</button></td>
      </tr>

            </>)
        }

      

    </tbody>
  </table>
</div>
<ToastContainer autoClose={1000} />
        </div>
    );
};

export default Myproducts;