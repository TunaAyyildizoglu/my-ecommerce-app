import React, { useState } from "react";
import { Box } from "@mui/material"; // LeftSide bileşeni
import ProductList from "../../components/ProductList/ProductList";
import { fetchProducts } from "../../api/productsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MainComponent: React.FC = () => {
  const productss = useSelector((state: RootState) => state.products.products);

  return (
    <Box className="flex justify-start px-4 sm:px-6 lg:px-12 mt-[50px] mb-[100px] gap-x-3">
      <ProductList />
    </Box>
  );
};

export default MainComponent;
