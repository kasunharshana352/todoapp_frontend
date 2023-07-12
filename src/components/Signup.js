import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const serverURL = process.env.REACT_APP_SERVER_URL;

  const handleSignup = async (e) => {
    console.log("submit");
    e.preventDefault();
    try {
      // Make a POST request to your backend signup endpoint
      const response = await axios.post(`${serverURL}/api/auth/signup`, {
        username,
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
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
