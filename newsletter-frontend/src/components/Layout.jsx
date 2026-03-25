import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="body">
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default Layout;