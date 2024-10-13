import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { setTotalPrice } from "../../redux/slices/productSlice";

interface CartProps {
  cartItems: {
    id: string;
    name: string;
    model: string;
    price: number;
    quantity: number;
  }[];
  onUpdateCart: (
    updatedCartItems: {
      id: string;
      name: string;
      model: string;
      price: number;
      quantity: number;
    }[]
  ) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onUpdateCart }) => {
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleIncrease = (itemId: string) => {
    onUpdateCart(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  useEffect(() => {
    dispatch(setTotalPrice(totalPrice));
  }, [totalPrice, dispatch]);

  const handleDecrease = (itemId: string) => {
    const updatedItems = cartItems
      .map((item) => {
        if (item.id === itemId) {
          const newQuantity = item.quantity - 1;
          if (newQuantity <= 0) {
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item !== null) as {
      id: string;
      name: string;
      model: string;
      price: number;
      quantity: number;
    }[];

    onUpdateCart(updatedItems);
  };
  return (
    <div className="flex flex-col gap-y-3 w-full md:w-full xl:w-[310px]">
      <label>Cart</label>
      <div className="border rounded p-3 bg-white shadow-md">
        {cartItems.length === 0 ? (
          <span className="text-red-600">Your cart is empty.</span>
        ) : (
          <div className="flex flex-col gap-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <span>{item.name}</span>
                  <span className="text-blue-600 text-sm">{item.price}₺</span>
                </div>
                <div className="flex items-center">
                  <Button
                    size="small"
                    onClick={() => handleDecrease(item.id)}
                    className="text-gray bg-[#F3F3F6]"
                  >
                    -
                  </Button>
                  <span className="text-white text-lg bg-blue-600 px-2">
                    {item.quantity}
                  </span>
                  <Button
                    size="small"
                    onClick={() => handleIncrease(item.id)}
                    className="text-gray bg-[#F3F3F6]"
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <label>Checkout</label>
      <div className="border rounded p-3 bg-white shadow-md">
        <label>
          Total Price:{" "}
          <span className="text-blue-700 font-bold">{totalPrice}₺</span>
        </label>
        <Button variant="contained" color="primary" className="w-full mt-2">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
