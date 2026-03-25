import React, { useState } from "react";
import { subscribeUser } from "../api/api";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (action) => {
    const res = await subscribeUser({ email, name, action });
    navigate("/success", { state: { message: res.message } });
  };

  return (
    <div>
      <h1>Newsletter System</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <div className="btn-group">
        <button onClick={() => handleSubmit("subscribe")}>
          Subscribe
        </button>

        <button className="secondary" onClick={() => handleSubmit("unsubscribe")}>
          Unsubscribe
        </button>
      </div>
    </div>
  );
};

export default Form;