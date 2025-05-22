import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/Product";

interface Props {
  product: Product;
  onAddToCart?: (productId: number) => void;
}

const ProductCard = ({ product, onAddToCart }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea onClick={() => navigate(`/products/${product.id}`)}>
        <CardMedia
          component="img"
          height="180"
          image={product.imageUrl || "https://via.placeholder.com/300x200?text=Product"}
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ minHeight: "40px" }}
          >
            {product.description.length > 50
              ? product.description.slice(0, 50) + "..."
              : product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Typography variant="h6" color="primary">
          ₹{product.price.toFixed(2)}
        </Typography>
        <Button
          size="small"
          variant="contained"
          onClick={() =>  onAddToCart?.(product.id)}
        >
          {"Add to Cart"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
