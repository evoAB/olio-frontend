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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import api from "../services/api";

interface Category {
  id: number;
  name: string;
}

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "success"
  );

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const showToast = (message: string, severity: "success" | "error") => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch categories", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (category?: Category) => {
    if (category) {
      setEditId(category.id);
      setName(category.name);
    } else {
      setEditId(null);
      setName("");
    }
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/categories/${editId}`, { name });
        showToast("Category updated successfully", "success");
      } else {
        await api.post("/categories", { name });
        showToast("Category added successfully", "success");
      }
      setOpen(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
      showToast("Failed to save category", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this category?")) return;
    setLoading(true);
    try {
      await api.delete(`/categories/${id}`);
      showToast("Category deleted successfully", "success");
      fetchCategories();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete category", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h5">Manage Categories</Typography>
        <Button
          variant="contained"
          onClick={() => handleOpen()}
          disabled={loading || saving}
        >
          Add Category
        </Button>
      </Box>

      <Paper sx={{ width: "100%", overflow: "auto", maxHeight: 400, position: 'relative' }}>
        {loading ? (
          <Box
            sx={{
              height: 400,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleOpen(cat)}
                        disabled={loading || saving}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(cat.id)}
                        disabled={loading || saving}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={() => (saving ? null : setOpen(false))}>
        <DialogTitle>{editId ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            disabled={saving}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={saving}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity={toastSeverity}
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminCategories;
