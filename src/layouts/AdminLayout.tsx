import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const menuItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Categories", path: "/admin/categories" },
  { label: "Products", path: "/admin/products" },
  { label: "Users", path: "/admin/users" },
];

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" minHeight="calc(100vh - 64px)">
      {/* Sidebar */}
      <Box
        width={220}
        bgcolor="#f4f6f8"
        borderRight="1px solid #ddd"
        sx={{ position: "sticky", top: 64, height: "calc(100vh - 64px)" }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main content */}
      <Box flex={1} p={3}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
