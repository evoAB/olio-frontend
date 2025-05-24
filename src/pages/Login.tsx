import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {
      email: /\S+@\S+\.\S+/.test(email) ? "" : "Valid email is required",
      password: password.trim() ? "" : "Password is required",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await api.post("/users/login", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setFormError("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Card sx={{ width: "100%", p: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome Back
            </Typography>

            {formError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formError}
              </Alert>
            )}

            <Box component="form" onSubmit={handleLogin} noValidate>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                required
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate("/")}
              >
                Explore Home
              </Button>
            </Box>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "#1976d2" }}
              >
                Register here
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
