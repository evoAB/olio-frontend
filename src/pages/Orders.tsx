import { useEffect, useState } from "react";
import type { Order } from "../types/Order";
import { getOrders } from "../services/orderService";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
} from "@mui/material";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      {orders?.map((order) => (
        <Card key={order.id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">Order #{order.id}</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Date: {new Date(order.createdAt).toLocaleString()}
            </Typography>
            <Divider sx={{ my: 1 }} />
            {order?.items.map((item) => (
              <Box
                key={item.id}
                display="flex"
                justifyContent="space-between"
                mb={1}
              >
                <Typography>{item.product.name}</Typography>
                <Typography>
                  {item.quantity} x ₹{item.price.toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle1" fontWeight="bold">
              Total: ₹{order.total.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Orders;
