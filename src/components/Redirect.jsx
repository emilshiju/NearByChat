



import React from 'react';
import { Redirect } from 'react-router-dom';

const RedirectToLogin = () => {
  // Example condition for redirection (e.g., user is not authenticated)
  const shouldRedirect = true; // Replace with your actual condition

  if (shouldRedirect) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      {/* Your component content */}
    </>
  );
};

export default RedirectToLogin;
