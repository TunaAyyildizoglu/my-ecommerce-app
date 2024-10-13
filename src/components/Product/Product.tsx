import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  id: string;
  image: string;
  price: number;
  productName: string;
  createdAt: string;
  onAddToCart: () => void;
}

const Product: React.FC<ProductProps> = ({
  id,
  image,
  price,
  productName,
  createdAt,
  onAddToCart,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      key={id}
      onClick={handleNavigate}
      style={{ cursor: "pointer" }}
      className="m-[0px] md-[0px] p-[10px] maxWidth-[345px]"
    >
      <CardMedia component="img" height="140" image={image} alt={productName} />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "16px 0px",
        }}
      >
        <Typography
          variant="h6"
          className="!mb-[10px] text-blue-500"
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
          }}
        >
          {price.toFixed(2)} ₺
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontSize: { xs: ".5rem", sm: ".8rem", md: "1rem" },
          }}
        >
          {productName}
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          padding: 1,
          fontSize: { xs: "0.5rem", sm: ".6rem", md: ".8rem" },
        }}
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart();
        }}
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default Product;
