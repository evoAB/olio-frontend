import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import type { Product } from "../types/Product";
import {
  Box,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import FilterListIcon from "@mui/icons-material/FilterList";

const SearchPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await api.get(
          `/products?search=${query}&sortBy=${sortBy}&sortOrder=${order}`
        );
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching search results", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query, sortBy, order]);

  return loading ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box p={3}>
      <Box mb={3} borderBottom={1} borderColor="grey.300" pb={1}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" align="center">
            Search results for{" "}
            <Box component="span" fontWeight="bold" color="primary.main">
              "{query}"
            </Box>
          </Typography>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <IconButton onClick={handleClick}>
              <FilterListIcon />
            </IconButton>
          </Box>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <Box px={2} py={1}>
              <Typography variant="subtitle2">Sort By</Typography>
              <RadioGroup
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  handleClose();
                }}
              >
                <FormControlLabel
                  value="name"
                  control={<Radio />}
                  label="Name"
                />
                <FormControlLabel
                  value="price"
                  control={<Radio />}
                  label="Price"
                />
              </RadioGroup>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle2">Order</Typography>
              <RadioGroup
                value={order}
                onChange={(e) => {
                  setOrder(e.target.value);
                  handleClose();
                }}
              >
                <FormControlLabel
                  value="asc"
                  control={<Radio />}
                  label="Ascending"
                />
                <FormControlLabel
                  value="desc"
                  control={<Radio />}
                  label="Descending"
                />
              </RadioGroup>
            </Box>
          </Menu>
        </Box>
      </Box>
      {products.length === 0 ? (
        <Typography>No products found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SearchPage;
