// import React from "react";
// import PropTypes from "prop-types";
// import { Route, Navigate } from "react-router-dom";

// const AuthenticatedRoute = ({ component: Component, ...rest }) => {
//   const token = localStorage.getItem("token");

//   return (
//     <Route
//       {...rest}
//       element={token ? <Component {...props} /> : <Navigate to="/signin" />} // Use Navigate instead of Redirect
//     />
//   );
// };

// AuthenticatedRoute.propTypes = {
//   component: PropTypes.elementType.isRequired, // Add prop validation for the component prop
// };

// export default AuthenticatedRoute;
