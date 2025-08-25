import React, { useState, useEffect } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";
import PostList from "./PostList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);
  const [hovered, setHovered] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    setError("");
    setLoadingRegister(true);
    try {
      await axios.post("http://localhost:3000/api/register", formData);
      toast.success("Regjistrimi u krye me sukses! Tani logohu.");
      setIsRegistering(false);
      setFormData({ name: "", surname: "", email: "", password: "" });
    } catch (err) {
      setError("Regjistrimi dështoi - Useri ekziston.");
      toast.error("Regjistrimi dështoi - Useri ekziston.");
    }
    setLoadingRegister(false);
  };

  const handleLogin = async () => {
    setError("");
    setLoadingLogin(true);
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: formData.email,
        password: formData.password,
      });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      toast.success("U loguat me sukses!");
    } catch (err) {
      setError("Password apo email gabim.");
      toast.error("Password apo email gabim.");
    }
    setLoadingLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    setPosts([]);
  };

  const refreshPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data.data); // ✅ Shko te "data" brenda objektit
    } catch (err) {
      console.error("Gabim gjatë marrjes së postimeve:", err);
    }
  };
  

  // ✅ Shton një postim në listë
  const addNewPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  useEffect(() => {
    if (token) {
      refreshPosts();
    }
  }, [token]);

  // 🔧 Styles (pa ndryshime këtu)
  const containerStyle = {
    maxWidth: "420px",
    margin: "40px auto",
    padding: "25px 30px",
    boxShadow: "0 4px 12px rgb(0 0 0 / 0.15)",
    borderRadius: "8px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#fff",
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    marginBottom: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    outline: "none",
    transition: "border-color 0.2s",
    textAlign: "left",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#0366d6",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const buttonHover = {
    backgroundColor: "#024eac",
  };

  const toggleLinkStyle = {
    color: "#0366d6",
    cursor: "pointer",
    textDecoration: "underline",
  };

  const errorStyle = {
    color: "#d73a49",
    marginBottom: "12px",
    fontWeight: "600",
  };

  const loggedInContainerStyle = {
    display: "flex",
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    gap: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const leftColumnStyle = {
    flex: 3,
  };

  const rightColumnStyle = {
    flex: 1,
    backgroundColor: user?.role === "admin" ? "#f1f8ff" : "#f6f8fa",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    height: "fit-content",
    boxShadow: "0 4px 12px rgb(0 0 0 / 0.15)",
  };

  const iconStyle = {
    width: "120px",
    marginTop: "20px",
  };

  return (
    <div>
      {!user ? (
        <div style={containerStyle}>
          <h2 style={{ marginBottom: "25px", color: "#24292e" }}>
            {isRegistering ? "Regjistrohu" : "Login"}
          </h2>

          {isRegistering && (
            <>
              <input
                name="name"
                placeholder="Emri"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
              />
              <input
                name="surname"
                placeholder="Mbiemri"
                value={formData.surname}
                onChange={handleChange}
                style={inputStyle}
              />
            </>
          )}

          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
          />

          {error && <div style={errorStyle}>{error}</div>}

          <button
            style={hovered ? { ...buttonStyle, ...buttonHover } : buttonStyle}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={isRegistering ? handleRegister : handleLogin}
            disabled={isRegistering ? loadingRegister : loadingLogin}
          >
            {(isRegistering ? loadingRegister : loadingLogin)
              ? isRegistering
                ? "Po regjistrohemi..."
                : "Po logohesh..."
              : isRegistering
              ? "Regjistrohu"
              : "Login"}
          </button>

          <p
            style={{
              marginTop: "20px",
              color: "#586069",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {isRegistering ? "Ke llogari?" : "S'ke llogari?"}{" "}
            <span
              onClick={() => {
                setError("");
                setIsRegistering(!isRegistering);
              }}
              style={toggleLinkStyle}
            >
              {isRegistering ? "Login këtu" : "Regjistrohu këtu"}
            </span>
          </p>
        </div>
      ) : (
        <div style={loggedInContainerStyle}>
          <div style={leftColumnStyle}>
            <CreatePost
              token={token}
              addNewPost={addNewPost}
              refreshPosts={refreshPosts}
            />
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <PostList
              posts={posts}
              token={token}
              user={user}
              refreshPosts={refreshPosts}
            />
            </div>
          </div>
          <div style={rightColumnStyle}>
            {user.role === "admin" ? (
              <>
                <h2 style={{ color: "#0366d6", fontWeight: "700" }}>
                  Mirësevini Admin {user.name}!
                </h2>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                  alt="Admin Icon"
                  style={iconStyle}
                />
              </>
            ) : (
              <>
                <h2 style={{ color: "#24292e", fontWeight: "600" }}>
                  Mirësevini {user.name}!
                </h2>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                  alt="User Icon"
                  style={iconStyle}
                />
              </>
            )}
            <button
              onClick={handleLogout}
              style={{
                marginTop: "30px",
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#d73a49",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#b8323c")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#d73a49")}
            >
              Dil nga llogaria
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
