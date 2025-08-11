import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import ReceiptIcon from "@mui/icons-material/Receipt";
import api from "../services/api";

interface SellerRequest {
  id: number;
  name: string;
  email: string;
  role: string;
  status?: string;
}

interface StatItem {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<StatItem[]>([
    {
      label: "Total Users",
      value: 0,
      icon: <PersonIcon fontSize="large" />,
      color: "#E3F2FD",
    },
    {
      label: "Pending Seller Requests",
      value: 0,
      icon: <ShoppingCartIcon fontSize="large" />,
      color: "#E8F5E9",
    },
    {
      label: "Total Sellers",
      value: 0,
      icon: <StoreIcon fontSize="large" />,
      color: "#FFF3E0",
    },
    {
      label: "Orders",
      value: 0,
      icon: <ReceiptIcon fontSize="large" />,
      color: "#FFEBEE",
    },
  ]);

  const [requests, setRequests] = useState<SellerRequest[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    fetchDashboardStats();
    fetchRequests();
  }, []);

  const fetchDashboardStats = async () => {
    setLoadingStats(true);
    try {
      const res = await api.get("/admin/dashboard-status");
      const data = res.data;
      setStats((prevStats) =>
        prevStats.map((item) => {
          switch (item.label) {
            case "Total Users":
              return { ...item, value: data.totalUsers };
            case "Pending Seller Requests":
              return { ...item, value: data.pendingSellerRequests };
            case "Total Sellers":
              return { ...item, value: data.totalSellers };
            case "Orders":
              return { ...item, value: data.totalOrders };
            default:
              return item;
          }
        })
      );
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
      setSnackbar({
        open: true,
        message: "Failed to load dashboard stats.",
        severity: "error",
      });
    } finally {
      setLoadingStats(false);
    }
  };

  const fetchRequests = async () => {
    setLoadingRequests(true);
    try {
      const res = await api.get("/admin/seller-requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to load seller requests", err);
      setSnackbar({
        open: true,
        message: "Failed to load seller requests.",
        severity: "error",
      });
    } finally {
      setLoadingRequests(false);
    }
  };

  const handleAction = async (email: string, action: "approve" | "reject") => {
    try {
      await api.post(`/admin/seller-requests/${email}/${action}`);

      setRequests((prev) =>
        prev.map((req) =>
          req.email === email ? { ...req, status: action.toUpperCase() } : req
        )
      );

      // Refresh stats after action
      fetchDashboardStats();
      fetchRequests();

      setSnackbar({
        open: true,
        message: `Seller request ${action}d successfully!`,
        severity: "success",
      });
    } catch (err) {
      console.error(`Failed to ${action} request`, err);
      setSnackbar({
        open: true,
        message: `Failed to ${action} request.`,
        severity: "error",
      });
    }
  };

  // Centered loader component to reuse
  const CenteredLoader = ({ label }: { label: string }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: 150,
        gap: 1,
      }}
    >
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      {loadingStats ? (
        <CenteredLoader label="Loading dashboard stats..." />
      ) : (
        <Grid container spacing={2} mb={4}>
          {stats.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: item.color,
                  borderRadius: 2,
                  height: "100%",
                  textAlign: "center",
                }}
              >
                {item.icon}
                <Typography variant="subtitle1" mt={1}>
                  {item.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pending Seller Requests */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Pending Seller Requests
        </Typography>
        {loadingRequests ? (
          <CenteredLoader label="Loading seller requests..." />
        ) : (
          <Stack spacing={2}>
            {requests.map((req, index) => (
              <Card key={index} variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {req.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {req.email}
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mr: 1 }}
                      onClick={() => handleAction(req.email, "approve")}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleAction(req.email, "reject")}
                    >
                      Reject
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Paper>

      {/* Snackbar Toast (Top-Center) */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
