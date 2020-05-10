import React from "react";

const Response = ({ response }) => {
  const { message } = response;
  return (
    <div className="App">
      <p>{message}</p>
    </div>
  );
};

export default Response;
