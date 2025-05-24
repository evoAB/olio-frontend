import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
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
    const { name, email, password } = formData;
    const newErrors = {
      name: name.trim() ? "" : "Name is required",
      email: /\S+@\S+\.\S+/.test(email) ? "" : "Valid email is required",
      password:
        password.length >= 6 ? "" : "Password must be at least 6 characters",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await api.post("users/register", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setFormError("Registration failed. User may already exist.");
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
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Create an Account
          </Typography>

          {formError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              name="name"
              label="Full Name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              required
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
              error={!!errors.password}
              helperText={errors.password}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
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
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Login here
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
