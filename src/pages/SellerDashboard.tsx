import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import api from "../services/api";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryName: string;
}

interface Category {
  id: number;
  name: string;
}

const SellerDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchSellerProducts();
    fetchCategories();
  }, []);

  const fetchSellerProducts = async () => {
    try {
      const res = await api.get("/products/seller");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setImageUrl("");
    setCategoryId("");
    setEditId(null);
    setIsEditing(false);
  };

  const handleAddOrUpdate = async () => {
    try {
      if (isEditing && editId) {
        await api.put(`/products/${editId}`, {
          name,
          description,
          price: parseFloat(price),
          imageUrl,
          categoryId,
        });
        setSnackbar({ open: true, message: "Product updated successfully!", severity: "success" });
      } else {
        await api.post("/products", {
          name,
          description,
          price: parseFloat(price),
          imageUrl,
          categoryId,
        });
        setSnackbar({ open: true, message: "Product added successfully!", severity: "success" });
      }
      setOpenDialog(false);
      resetForm();
      fetchSellerProducts();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Operation failed", severity: "error" });
    }
  };

  const handleEdit = (product: Product) => {
    setIsEditing(true);
    setEditId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
    setImageUrl(product.imageUrl);
    const cat = categories.find((c) => c.name === product.categoryName);
    if (cat) setCategoryId(cat.id.toString());
    setOpenDialog(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setSnackbar({ open: true, message: "Product deleted successfully!", severity: "success" });
      fetchSellerProducts();
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Failed to delete product", severity: "error" });
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">My Products</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            resetForm();
            setOpenDialog(true);
          }}
        >
          Add Product
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 ? (
                products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <Avatar variant="square" src={p.imageUrl} alt={p.name} />
                    </TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.description}</TableCell>
                    <TableCell>{p.categoryName}</TableCell>
                    <TableCell>₹{p.price}</TableCell>
                    <TableCell align="right">
                      <Button size="small" onClick={() => handleEdit(p)}>Edit</Button>
                      <Button size="small" color="error" onClick={() => handleDelete(p.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">No products found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            margin="normal"
          />
          <TextField
            select
            fullWidth
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            margin="normal"
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddOrUpdate}>
            {isEditing ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SellerDashboard;
