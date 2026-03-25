import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout>
      <h1>Success!</h1>
      <div className="success-box">
        {location.state?.message}
      </div>

      <button onClick={() => navigate("/")}>Back Home</button>
    </Layout>
  );
};

export default Success;