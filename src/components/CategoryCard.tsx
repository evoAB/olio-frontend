import { Card, CardActionArea, Typography } from "@mui/material";

const CategoryCard = ({ category, onClick }: any) => {
  return (
    <Card
      sx={{
        minWidth: 140,
        borderRadius: 3,
        boxShadow: "none",
        border: "1px solid #ddd",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardActionArea onClick={onClick} sx={{ p: 2, textAlign: "center" }}>
        {/* <Box
          sx={{
            width: 60,
            height: 60,
            backgroundColor: "#f5f5f5",
            borderRadius: "50%",
            mx: "auto",
            mb: 1,
          }}
        /> */}
        <Typography variant="subtitle1" fontWeight={500}>
          {category.name}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
