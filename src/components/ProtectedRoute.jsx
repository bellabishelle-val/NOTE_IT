import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-warning" role="alert">
          <h2 className="alert-heading">Authentication Required</h2>
          <p>You need to sign in to access this page.</p>
          <hr />
          <p className="mb-0">
            <a href="/signin" className="btn btn-primary">Sign In</a> or{' '}
            <a href="/signup" className="btn btn-outline-primary">Sign Up</a>
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
