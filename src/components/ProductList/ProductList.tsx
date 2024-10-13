import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "../../components/Product/Product";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { RootState, AppDispatch } from "../../redux/store";
import LeftSide from "../LeftSide/LeftSide";
import Cart from "../Cart/Cart";
import { fetchProducts } from "../../redux/slices/productSlice";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.products.products);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);
  const searchTerm = useSelector(
    (state: RootState) => state.products.searchTerm
  );
  const getBrandName = useSelector((state: RootState) => state.products.brands);
  const getModelName = useSelector((state: RootState) => state.products.models);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState<string>("");
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>([]);
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

  const productsPerPage = 12;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProductsBySearchTerm = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [products, searchTerm]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];

    if (sortType === "oldToNew") {
      sorted = sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else if (sortType === "newToOld") {
      sorted = sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortType === "highToLow") {
      sorted = sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortType === "lowToHigh") {
      sorted = sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    return sorted;
  }, [filteredProducts, sortType]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    let filtered = filteredProductsBySearchTerm;

    if (selectedBrandIds.length > 0) {
      const matchedBrandNames = getBrandName
        .filter((item) => selectedBrandIds.includes(item.id))
        .map((item) => item.name);

      filtered = filtered.filter((product) =>
        matchedBrandNames.includes(product.brand)
      );
    }

    if (selectedModelIds.length > 0) {
      const matchedModelNames = getModelName
        .filter((item) => selectedModelIds.includes(item.id))
        .map((item) => item.name);

      filtered = filtered.filter((product) =>
        matchedModelNames.includes(product.model)
      );
    }

    setFilteredProducts(filtered);
  }, [filteredProductsBySearchTerm, selectedBrandIds, selectedModelIds]);

  const handleBrandChange = (selectedBrandIds: string[]) => {
    setSelectedBrandIds(selectedBrandIds);
  };

  const handleModelChange = (selectedModelIds: string[]) => {
    setSelectedModelIds(selectedModelIds);
  };

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

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row xl:flex-row gap-6">
      <div className="w-full md:w-1/4">
        <LeftSide
          onSortChange={setSortType}
          onBrandChange={handleBrandChange}
          onModelChange={handleModelChange}
        />
      </div>

      <div className="flex-grow flex flex-col">
        <Grid container spacing={2} justifyContent="start">
          {currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Product
                id={product.id}
                image={product.image}
                price={parseFloat(product.price)}
                productName={product.name}
                createdAt={product.createdAt}
                onAddToCart={() =>
                  handleAddToCart({
                    id: product.id,
                    name: product.name,
                    model: product.model,
                    price: parseFloat(product.price),
                  })
                }
              />
            </Grid>
          ))}
        </Grid>

        <div className="flex justify-center mt-4">
          <Pagination
            count={Math.ceil(sortedProducts.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </div>

      <div>
        <Cart cartItems={cartItems} onUpdateCart={handleUpdateCart} />
      </div>
    </div>
  );
};

export default ProductList;
