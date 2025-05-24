import { Box, Typography } from "@mui/material";

const HeroBanner = () => {

  return (
    <Box
      sx={{
        backgroundImage: `url('https://images.unsplash.com/photo-1521334884684-d80222895322?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: 2,
        position: "relative",
        px: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: 2,
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1, color: "white" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {"Welcome to Olio"}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {"Discover the latest products at unbeatable prices!"}
        </Typography>
        {/* <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#ffffff",
            color: "#000",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            borderRadius: "30px",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
          onClick={() => navigate("/products")}
        >
          {"Shop Now"}
        </Button> */}
      </Box>
    </Box>
  );
};

export default HeroBanner;
