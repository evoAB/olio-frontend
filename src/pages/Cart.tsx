import { useEffect, useState } from "react";
import type { Cart } from "../types/Cart";
import { getCart, removeFromCart, updateQuatity } from "../services/cartApi";
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import CartItemCard from "../components/CartItemCard";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../services/orderService";

const Cart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId: number) => {
    await removeFromCart(productId);
    fetchCart();
  };

  const handleUpdate = async (productId: number, quantity: number) => {
    await updateQuatity(productId, quantity);
    fetchCart();
  };

  const handlePlaceOrder = async () => {
    try {
      await placeOrder();
      alert("Order placed successfully");
      navigate("/orders");
    } catch (error) {
      console.error("Failed to place order", error);
      alert("Failed to place order");
    }
  };

  const calculateTotal = () =>
    cart?.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ) ?? 0;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {"Your Cart"}
      </Typography>

      {cart?.items.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          Your cart is empty.
        </Typography>
      ) : (
        cart?.items.map((item) => (
          <CartItemCard
            key={item.id}
            item={item}
            onRemove={handleRemove}
            onUpdate={handleUpdate}
          />
        ))
      )}

      {cart && cart.items.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              Total: ${calculateTotal().toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePlaceOrder}
            >
              {"Place Order"}
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
