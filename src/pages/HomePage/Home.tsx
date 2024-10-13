import React, { useState } from "react";
import { Box } from "@mui/material"; // LeftSide bileşeni
import ProductList from "../../components/ProductList/ProductList";
import { fetchProducts } from "../../api/productsApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MainComponent: React.FC = () => {
  const productss = useSelector((state: RootState) => state.products.products);

  return (
    <Box className="flex justify-start px-4 sm:px-6 md:px-8 lg:px-12 my-6 sm:my-8 md:my-12 lg:my-16 mx-4 sm:mx-6 md:mx-10 lg:mx-20 gap-x-3">
      <ProductList />
    </Box>
  );
};

export default MainComponent;
