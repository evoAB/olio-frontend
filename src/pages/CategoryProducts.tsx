import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import {
  getCategoryById,
  getProductsByCategory,
} from "../services/categoryApi";
import type { Category } from "../types/Category";
import { addToCart } from "../services/cartApi";

const CategoryProducts = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<Category>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const productsRes = await getProductsByCategory(Number(id));
        const categoryRes = await getCategoryById(Number(id));
        setProducts(productsRes.data);
        setCategory(categoryRes.data);
      } catch (err) {
        console.error("Failed to fetch category products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [id]);

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
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        {category?.name} Products
      </Typography>
      {products.length === 0 ? (
        <Typography>No products found in this category.</Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CategoryProducts;
