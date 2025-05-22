import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { CartItem } from "../types/Cart";
import type React from "react";
import { useState } from "react";

interface Props {
  item: CartItem;
  onRemove: (productId: number) => void;
  onUpdate: (productId: number, quantity: number) => void;
}

const CartItemCard = ({ item, onRemove, onUpdate }: Props) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setQuantity(val);
    if (val > 0) {
      onUpdate(item.product.id, val);
    }
  };
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* <img
            src={item.product.imageUrl}
            alt={item.product.name}
            style={{
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: 12,
            }}
          /> */}
          <Box>
            <Typography variant="h6">{item.product.name}</Typography>
            <Typography color="text.secondary">
              ${item.product.price} x {quantity} = $
              {(item.product.price * quantity).toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              type="number"
              size="small"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }}
              sx={{ width: 70 }}
            />
            <IconButton color="error" onClick={() => onRemove(item.product.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box border={1} borderRadius={2} p={{ xs: 2, md: 4 }}>
      <Typography variant="h6">{item.product.name}</Typography>
      <Typography>{"Price: $" + item.product.name}</Typography>
      <Typography>{"Quantity: " + item.quantity}</Typography>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => onUpdate(item.product.id, item.quantity + 1)}
      >
        {"+"}
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => onUpdate(item.product.id, item.quantity - 1)}
        disabled={item.quantity === 1}
      >
        {"-"}
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => onRemove(item.product.id)}
      >
        {"Remove"}
      </Button>
    </Box>
  );
};
export default CartItemCard;
