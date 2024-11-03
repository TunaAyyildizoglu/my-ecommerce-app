import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setSearchTerm } from "../../redux/slices/productSlice"; // Redux action
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "black",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(2em + ${theme.spacing(2)})`,
    width: "100%",
  },
}));

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = useSelector(
    (state: RootState) => state.products.totalPrice
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleNavigateHome = () => {
    navigate("/");
  };
  return (
    <AppBar position="static">
      <Toolbar className="flex flex-col md:flex-row justify-between items-center px-4 md:p-[20px] p-[10px]">
        <Box className="flex items-center md:w-1/4 mb-2 md:mb-0 px-4 md:px-20">
          <Typography
            variant="h6"
            component="div"
            className="font-bold text-2xl cursor-pointer"
            onClick={handleNavigateHome}
          >
            LOGO
          </Typography>
        </Box>

        <Box className="flex justify-start md:w-1/2 relative md:mb-[0px] mb-[20px] ">
          <SearchInput
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearchChange}
            className="md:w-[600px]"
          />
        </Box>

        <Box className="flex flex-col md:flex-row justify-end items-center gap-2 w-full md:w-1/4">
          <Typography variant="body1" component="div" className="text-lg">
            <ShoppingCartIcon /> {totalPrice}₺
          </Typography>
          <Typography variant="body1" component="div" className="text-lg">
            <PersonIcon /> Kerem
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
