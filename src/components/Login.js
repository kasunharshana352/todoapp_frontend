import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend login endpoint
      const response = await axios.post(`${serverURL}/api/auth/login`, {
        email,
        password,
      });
      const { token } = response.data;
      // Store the token in local storage
      await localStorage.setItem("token", token);
      console.log(response.data); // Handle the response as needed

      // Redirect to the profile page
      navigate("/profile");

      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
