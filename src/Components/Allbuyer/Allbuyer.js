import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fireAuthContext } from '../../Context/Context';


const Allbuyer = () => {
    const [buyers, setBuyers] = useState([]);
    const {deleteUser} = useContext(fireAuthContext)

    const handleDelete = ( name, id) => {
        const proceed = window.confirm(`Are you sure to delete this: ${name}`)
        // console.log(proceed)
        
        if(proceed){
            fetch(`https://phone-resale-server.vercel.app/users/${id}`, {
                method: "DELETE" 
            }).then(res => res.json()).then(data => {
                console.log(data)
                toast.success("Deleted Successfully", { autoClose: 1000 });
                // if(data.deletedCount > 0) {
    
                //     const remaining = displayEmail.filter(disEmail => disEmail._id !== id )
                //     setDisplayEmail(remaining)
                // }
            }).catch((err) => console.error(err));
            
        }
    }

    useEffect(() => {
      fetch(`https://phone-resale-server.vercel.app/usersingle?userRole=Buyer`)
        .then((res) => res.json())
        .then((data) => {
            setBuyers(data);
        });
    }, []);

   const handleDeleteUser = () => {
    deleteUser().then(() => {
        console.log('deleted');
      }).catch((error) => {
        console.log(error);
      });
    }
  
    console.log(buyers);
    return (
        <div>
        <h1  className="text-3xl text-bolder m-4"> All Buyer is here</h1>
        <div className="grid grid-cols-1 justify-center">
       {
          buyers.map(buyer => <div className='flex justify-center'>
  
  <p className="m-2 border-2 rounded-xl p-2 border-indigo-600">{buyer.name}</p>
  <p className="m-2 border-2 rounded-xl p-2 border-indigo-600 ">{buyer.email}</p>
  <p onClick={  () => { handleDelete(buyer.name, buyer._id) ; handleDeleteUser() } }className="btn  btn-error">Delete Buyer</p>
  
          </div> )
       }
        </div>
        <ToastContainer autoClose={1000}  />
      </div>
    );
};

export default Allbuyer;