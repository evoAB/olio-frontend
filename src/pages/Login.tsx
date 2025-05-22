import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { Button, Container, TextField } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // const response = await api.post("http://localhost:8080/api/users/login", {
      const response = await api.post("https://olio-backend-x2hq.onrender.com/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  //   return (
  //     <form onSubmit={handleLogin}>
  //       <h2>Login</h2>
  //       <input
  //         type="email"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         required
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         required
  //       />
  //       <button type="submit">Login</button>
  //     </form>
  //   );

  return (
    <>
      <Container maxWidth="sm">
        <h1>Login</h1>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Button onClick={handleLogin} variant="contained" color="primary">
          {"Login"}
        </Button>
      </Container>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </>
  );
};

export default Login;
