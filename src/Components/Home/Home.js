import React from 'react';
import { useLoaderData , Link } from "react-router-dom";

const Home = () => {
    const catData = useLoaderData()
    console.log(catData)
    return (
        <div>
            <h1>Catagories that can you shop from</h1>
            {
                catData.map(cat => <Link to={`/category/${cat._id}`}  className='btn btn-primary mx-5'>{cat.category_name}</Link>)
            }
        </div>
    );
};

export default Home;