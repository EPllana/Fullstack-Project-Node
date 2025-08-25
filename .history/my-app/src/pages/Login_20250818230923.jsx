import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';  

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);  // Toggle between login and signup

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin ? "http://localhost:3000/api/auth/login" : "http://localhost:3000/api//register"; 
      const res = await axios.post(url, {
        email,
        password,
      });
      setMessage(`${isLogin ? "Login" : "Signup"} successful!`);
      setError("");
      localStorage.setItem("token", res.data.token);
      console.log("User data:", res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || `${isLogin ? "Login" : "Signup"} failed`);
      setMessage("");
    }
  };

  return (
    <div className="container">
      <div className="background-image"></div> {/* Background image container */}
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"} 
        <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign up" : "Login"}</span>
      </p>
    </div>
  );
};

export default Login;
