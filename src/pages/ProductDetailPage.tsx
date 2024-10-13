import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Cart from "../components/Cart/Cart";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p: any) => p.id === id)
  );

  const [cartItems, setCartItems] = useState<
    {
      id: string;
      name: string;
      price: number;
      quantity: number;
      model: string;
    }[]
  >(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (!product) {
      return;
    }
  }, [product]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: {
    id: string;
    name: string;
    price: number;
    model: string;
  }) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateCart = (
    updatedCartItems: {
      id: string;
      name: string;
      price: number;
      quantity: number;
      model: string;
    }[]
  ) => {
    setCartItems(updatedCartItems);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Box display="flex" gap={5} mx="200px" my="100px">
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          flex: "0 0 80%",
          padding: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "50%", objectFit: "cover" }}
          image={product.image}
          alt={product.name}
        />
        <CardContent sx={{ flex: "1 0 50%", paddingLeft: 2 }}>
          <Typography variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography
            variant="h6"
            className="text-blue-600 !mt-[10px]"
            gutterBottom
          >
            {product.price ? parseFloat(product.price).toFixed(2) : "0.00"} ₺
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginBottom: "30px", width: "100%", marginTop: "50px" }}
            onClick={() =>
              handleAddToCart({
                id: product.id,
                name: product.name,
                model: product.model,
                price: parseFloat(product.price),
              })
            }
          >
            Add to Cart
          </Button>
          <Typography variant="body1">{product.description}</Typography>
        </CardContent>
      </Card>
      <Box sx={{ flex: "0 0 20%" }}>
        <Cart cartItems={cartItems} onUpdateCart={handleUpdateCart} />
      </Box>
    </Box>
  );
};

export default ProductDetailPage;
