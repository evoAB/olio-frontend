import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Alert,
  Button,
} from "@mui/material";
import HeroBanner from "../components/HeroBanner";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../services/productApi";
import { getAllCategories } from "../services/categoryApi";
import { addToCart } from "../services/cartApi";
import type { Product } from "../types/Product";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);
        setProducts(productRes.data);
        setCategories(categoryRes.data);
      } catch (err) {
        console.error("Failed to fetch home data", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId);
      alert("Item added to cart!");
    } catch (err) {
      console.error("Failed to add to cart", err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4 }}>
          Failed to load products and categories. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <HeroBanner />

      {/* Categories Section */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Shop by Category
        </Typography>
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            gap: 2,
            pb: 2,
            "& > *": {
              scrollSnapAlign: "start",
            },
          }}
        >
          {categories.map((cat: any) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onClick={() => navigate(`/categories/${cat.id}`)}
            />
          ))}
        </Box>
      </Box>

      {/* Featured Products Section */}
      <Box mt={6}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" fontWeight="bold">
            Featured Products
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#000",
              color: "#000",
              fontWeight: 600,
              borderRadius: "30px",
              px: 3,
              py: 1,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f8f8f8",
                borderColor: "#000",
              },
            }}
            onClick={() => navigate("/products")}
          >
            {"View All Products"}
          </Button>
        </Box>
        <Grid container spacing={3}>
          {products.slice(0, 8).map((product: Product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
