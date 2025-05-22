import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types/Product";
import api from "../services/api";
import { addToCart } from "../services/cartApi";
import { Button, CardMedia, Container, Typography } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProduct = async () => {
    try {
      const res = await api.get<Product>(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Failed to load product", err);
    }
  };

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product.id);
      alert("Added to cart!");
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {product.name}
      </Typography>
      <CardMedia component="img" height="300" image={product.imageUrl} />
      <Typography variant="body1" mt={2}>
        {product.description}
      </Typography>
      <Typography variant="h6" mt={2}>
        ${product.price}
      </Typography>
      <Button variant="contained" onClick={handleAddToCart} sx={{ mt: 2 }}>
        {"Add to Cart"}
      </Button>
    </Container>
  );
};

export default ProductDetails;
