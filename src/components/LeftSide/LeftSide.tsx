import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  setBrands,
  setModels,
} from "../../redux/slices/productSlice";
import type { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";

interface LeftSideProps {
  onSortChange: (sortType: string) => void;
  onBrandChange: (selectedBrandIds: string[]) => void;
  onModelChange: (selectedModelIds: string[]) => void;
}

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "black",
  backgroundColor: "#FAFBFB",
  borderRadius: theme.shape.borderRadius,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(2em + ${theme.spacing(2)})`,
    width: "220px",
  },
}));

const LeftSide: React.FC<LeftSideProps> = ({
  onSortChange,
  onBrandChange,
  onModelChange,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { brands, products, status, models } = useSelector(
    (state: RootState) => state.products
  );

  const [brandSearch, setBrandSearch] = useState<string>("");
  const [modelSearch, setModelSearch] = useState<string>("");
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);
  const [selectedModelIds, setSelectedModelIds] = useState<string[]>([]);

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSortChange(event.target.value);
  };

  const handleBrandChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    brandId: string
  ) => {
    setSelectedBrandIds((prevIds) => {
      const updatedIds = prevIds.includes(brandId)
        ? prevIds.filter((id) => id !== brandId)
        : [...prevIds, brandId];
      onBrandChange(updatedIds);
      return updatedIds;
    });
  };

  const handleModelChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    modelId: string
  ) => {
    setSelectedModelIds((prevIds) => {
      const updatedIds = prevIds.includes(modelId)
        ? prevIds.filter((id) => id !== modelId)
        : [...prevIds, modelId];
      onModelChange(updatedIds);
      return updatedIds;
    });
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(modelSearch.toLowerCase())
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (products.length > 0) {
      dispatch(setBrands());
      dispatch(setModels());
    }
  }, [products, dispatch]);

  return (
    <div className="flex flex-col gap-y-5 md:flex-row lg:flex-col md:gap-[10px]">
      <div className="flex flex-col sm:w-[400px] md:w-[250px]  lg:w-[300px] ">
        <label className="mb-2">Sort By</label>
        <div className="border rounded p-3 sm:w-[400px] md:w-[250px] lg:w-[300px] h-[200px] bg-white shadow-md">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              onChange={handleSortChange}
            >
              <FormControlLabel
                value="oldToNew"
                control={<Radio className="text-[#2A59FE]" />}
                label="Old to new"
              />
              <FormControlLabel
                value="newToOld"
                control={<Radio className="text-[#2A59FE]" />}
                label="New to old"
              />
              <FormControlLabel
                value="highToLow"
                control={<Radio className="text-[#2A59FE]" />}
                label="Price high to low"
              />
              <FormControlLabel
                value="lowToHigh"
                control={<Radio className="text-[#2A59FE]" />}
                label="Price low to high"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className="flex flex-col sm:w-[400px] md:w-[250px] lg:w-[300px]">
        <label className="mb-2">Brands</label>
        <div className="border rounded p-3 sm:w-[400px] md:w-[250px] lg:w-[300px] bg-white shadow-md">
          <SearchInput
            placeholder="Search…"
            className="mb-[15px] w-[200px]"
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
          />
          <div className="max-h-[120px] overflow-y-auto">
            <FormGroup>
              {filteredBrands.map((brand) => (
                <FormControlLabel
                  key={brand.id}
                  checked={selectedBrandIds.includes(brand.id)}
                  onChange={(e) =>
                    handleBrandChange(
                      e as React.ChangeEvent<HTMLInputElement>,
                      brand.id
                    )
                  }
                  control={<Checkbox className="text-[#2A59FE]" />}
                  label={brand.name}
                />
              ))}
            </FormGroup>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:w-[400px] md:w-[250px] lg:w-[300px]">
        <label className="mb-2">Models</label>
        <div className="border rounded p-3 sm:w-[400px] md:w-[250px] lg:w-[300px] bg-white shadow-md">
          <SearchInput
            placeholder="Search…"
            className="mb-[15px] w-[200px]"
            value={modelSearch}
            onChange={(e) => setModelSearch(e.target.value)}
          />
          <div className="max-h-[120px] overflow-y-auto">
            <FormGroup>
              {filteredModels.map((model) => (
                <FormControlLabel
                  key={model.id}
                  control={<Checkbox className="text-[#2A59FE]" />}
                  label={model.name}
                  onChange={(e) =>
                    handleModelChange(
                      e as React.ChangeEvent<HTMLInputElement>,
                      model.id
                    )
                  }
                />
              ))}
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
