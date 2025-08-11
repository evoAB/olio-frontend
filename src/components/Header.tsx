import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Button,
  CircularProgress,
  Paper,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { Storefront } from "@mui/icons-material";
import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  role: string;
  exp: number;
}

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleBecomeSeller = async () => {
    setLoading(true);
    try {
      await api.post("/users/become-seller");
      toast.success("Seller request submitted!");
      setRole("PENDING_SELLER");
    } catch (error: any) {
      toast.error(error?.response?.data || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          display="flex"
          alignItems="center"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Storefront sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h5" fontWeight="bold" color="primary">
            Olio
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          {token && (
            <>
              {role === "USER" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBecomeSeller}
                  disabled={loading}
                  startIcon={
                    loading && <CircularProgress size={20} color="inherit" />
                  }
                >
                  {loading ? "Requesting..." : "Become a Seller"}
                </Button>
              )}

              {role === "SELLER" && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/seller-dashboard")}
                >
                  Dashboard
                </Button>
              )}

              {role === "ADMIN" && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/admin")}
                >
                  Admin Dashboard
                </Button>
              )}
            </>
          )}

          <Box component="form" onSubmit={handleSearchSubmit}>
            <Paper
              component="div"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 300,
                borderRadius: 2,
                boxShadow: "none",
                border: "1px solid #ccc",
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                inputProps={{ "aria-label": "search products" }}
              />
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>

          <IconButton color="primary" onClick={() => navigate("/orders")}>
            <ListAltIcon />
          </IconButton>

          <IconButton color="primary" onClick={() => navigate("/cart")}>
            <Badge badgeContent={0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Button
            variant="outlined"
            color="error"
            startIcon={token && <LogoutIcon />}
            onClick={handleLogout}
          >
            {token ? "Logout" : "Login"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
