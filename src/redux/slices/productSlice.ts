import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface Brand {
  id: string;
  name: string;
}

interface Model {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  createdAt: string;
  brand: string;
  model: string;
  description: string;
}

export interface ProductsState {
  products: Product[];
  brands: Brand[];
  models: Model[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchTerm: string;
  totalPrice: number;
  description: string;
}

const initialState: ProductsState = {
  products: [],
  brands: [],
  models: [],
  status: "idle",
  error: null,
  searchTerm: "",
  totalPrice: 0,
  description: "",
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      "https://5fc9346b2af77700165ae514.mockapi.io/products"
    );
    const data = await response.json();
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setBrands(state) {
      const brandsSet = new Set<string>();
      state.products.forEach((product) => {
        brandsSet.add(product.brand);
      });
      state.brands = Array.from(brandsSet).map((brand, index) => ({
        id: `${index}`,
        name: brand,
      }));
    },
    getBrands(state, action) {
      state.brands = action.payload;
    },
    getModels(state, action) {
      state.models = action.payload;
    },
    setModels(state) {
      const modelsSet = new Set<string>();
      state.products.forEach((product) => {
        modelsSet.add(product.model);
      });
      state.models = Array.from(modelsSet).map((model, index) => ({
        id: `${index}`,
        name: model,
      }));
    },
    setTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.products = action.payload;
          state.brands = [];
          state.models = [];
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const {
  setSearchTerm,
  setBrands,
  setModels,
  setTotalPrice,
  getBrands,
  getModels,
} = productSlice.actions;

export default productSlice.reducer;
