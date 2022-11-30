import React, { useContext } from 'react';
import { fireAuthContext } from '../../Context/Context';
import {Navigate, useLocation} from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(fireAuthContext)
    const location = useLocation()

    if(loading){
        return <button className="btn loading">loading</button>
    }

    if(user && user.uid){
        return children
    }
    return (
        <div>
            return <Navigate to="/login" state={{from: location}} replace ></Navigate>
        </div>
    );
};

export default PrivateRoute;