import React, {  useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = ({children}) => {
  const {user, loading} = useContext(AuthContext)
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );

  }

 ;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;