import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Hardcoded demo user data
const USERS = {
  user: { username: "user1", password: "userpass" },
  admin: { username: "admin1", password: "adminpass" }
};

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  // Restore login role from localStorage on refresh
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);
  }, []);

  // Handler for login
  function handleLogin(e) {
    e.preventDefault();

    if (username === USERS.user.username && password === USERS.user.password) {
      setLoginStatus('Login successful!');
      setRole('User');
      localStorage.setItem("role", "User");
      alert(`Welcome, ${username}!`);
      navigate("/"); // user → home
    } else if (username === USERS.admin.username && password === USERS.admin.password) {
      setLoginStatus('Login successful!');
      setRole('Admin');
      localStorage.setItem("role", "Admin");
      alert(`Welcome, ${username}!`);
      navigate("/admin"); // ✅ admin → admin dashboard
    } else {
      setLoginStatus('Invalid credentials.');
      setRole('');
    }
  }

  // Logout handler
  function handleLogout() {
    setUsername('');
    setPassword('');
    setLoginStatus('');
    setRole('');
    localStorage.removeItem("role");
    navigate('/login');
  }

  const formStyle = {
    margin: "100px auto 40px",
    maxWidth: "320px",
    padding: "30px",
    borderRadius: "6px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.10)"
  };

  return (
    <div style={formStyle}>
      <center><h2>Login</h2></center>

      {role ? (
        <div>
          <p style={{ color: "green" }}>{loginStatus}</p>
          <p>Welcome, <strong>{role}</strong>!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              placeholder="Enter username"
              onChange={e => setUsername(e.target.value)}
              required
              autoFocus
            />
          </label>
          <br /><br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          <br /><br />
          <button type="submit">Login</button>
          <br /><br />
          {loginStatus && <p style={{ color: 'red' }}>{loginStatus}</p>}
        </form>
      )}

      <div style={{ marginTop: "20px", fontSize: "0.9em", color: "#999" }}>
        <div>Demo accounts:</div>
        <div>User - <strong>user1 / userpass</strong></div>
        <div>Admin - <strong>admin1 / adminpass</strong></div>
      </div>
    </div>
  );
}
