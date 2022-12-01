import React from 'react';
// import useTitle from '../Hooks/hooks';


const Error = () => {
    // useTitle('Error Page')
    return (
        <div>
            <p className='text-5xl font-bold m-7 p-7' >Page not found</p>
            <img className='mx-auto' src='error404.png' alt='error'></img>
        </div>
    );
};

export default Error;