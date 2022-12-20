import React from "react";

const Layout = (props) => {
  return (

    <div className="w-100" style={{ height: "100vh" }}>
      {props.page}
    </div>

  );
};

export default Layout;