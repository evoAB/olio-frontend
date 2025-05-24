import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { Storefront } from "@mui/icons-material";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
            startIcon={<LogoutIcon />}
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
