import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom';

const RedirectRoute = ({ children }) => {
    const { user } = useContext(UserContext);

    if(user) {
        <Navigate to = "/" replace />;
    }

    return children;
};

export default RedirectRoute;