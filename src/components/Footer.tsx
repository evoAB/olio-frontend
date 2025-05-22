import { Box, Divider, Grid, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#f5f5f5", mt: "auto", py: 4, width: "100%" }}
    >
      <Grid
        container
        spacing={4}
        sx={{ px: { xs: 2, sm: 4, md: 10 } }}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        {/* Left section: Olio */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Olio
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your one-stop destination for quality products at the best prices.
          </Typography>
        </Grid>

        {/* Right section: Quick Links and Contact Us */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: { xs: 4, sm: 8 },
              flexDirection: { xs: "column", sm: "row" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {/* Quick Links */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Quick Links
              </Typography>
              <Link
                href="/"
                underline="hover"
                color="text.secondary"
                display="block"
                sx={{ mb: 0.5 }}
              >
                Home
              </Link>
              <Link
                href="/cart"
                underline="hover"
                color="text.secondary"
                display="block"
                sx={{ mb: 0.5 }}
              >
                Cart
              </Link>
              <Link
                href="/orders"
                underline="hover"
                color="text.secondary"
                display="block"
              >
                Orders
              </Link>
            </Box>

            {/* Contact Us */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Contact Us
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Email: support@olio.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: +91-12345-67890
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Olio. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
