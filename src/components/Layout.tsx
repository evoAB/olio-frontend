import { Box } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
    return (
        <Box
          display="flex"
          flexDirection="column"
          minHeight="100vh"
          width="100%"
        >
          <Header />
          <Box flex="1" component="main">
            <Outlet />
          </Box>
          <Footer />
        </Box>
      );
};

export default Layout;
