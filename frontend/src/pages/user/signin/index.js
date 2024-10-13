import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../../../actions";
import { showToast } from "../../../components/common/toaster";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const move = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    try {
      // Dispatch the signin action and get the user information
      const response = await signin(email, password);

      if (response.success) {
        setPending(false);
        showToast("Signed In Successfully", "success");
        move("/home");
      } else {
        setPending(false);
        showToast("Unable To Sign In...", "error");
      }
    } catch (error) {
      // Handle error
      setPending(false);
      showToast("Error during signin", "error");
    }
  };

  return (
    <div className="create">
      <h2>Enter Info to Login: </h2>

      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          type="email"
          required
          placeholder="Type Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password: </label>
        <input
          type="password"
          required
          placeholder="Type Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!pending && <button>Signin</button>}
        {pending && <button disabled>Signing in.....</button>}
      </form>
    </div>
  );
};

export default Signin;
