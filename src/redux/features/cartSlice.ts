import { IProduct } from "@/types/Product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ICartItem extends IProduct {
  orderQuantity: number;
  orderPrice: number;
}
type IMedicineState = {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
  city: string;
  address: string;
  phone: string;
};
const initialState: IMedicineState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  city: "",
  address: "",
  phone: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<ICartItem>) => {
      const { _id } = action.payload;
      if (!state.items) {
        state.items = [];
      }
      const existingItem = state.items.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.orderQuantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          orderQuantity: 1,
        });
      }
      //state.totalQuantity += quantity;
      //state.totalPrice += price * quantity;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item._id === itemId);
      if (existingItem) {
        state.totalQuantity -= existingItem.orderQuantity;
        state.totalPrice -= existingItem.orderPrice;
        state.items = state.items.filter((item) => item._id !== itemId);
      }
    },
    incrementOrderQuantity: (state, action) => {
      const productToIncrement = state.items.find(
        (item) => item._id === action.payload
      );

      if (productToIncrement) {
        productToIncrement.orderQuantity += 1;
        return;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const productToIncrement = state.items.find(
        (item) => item._id === action.payload
      );

      if (productToIncrement && productToIncrement.orderQuantity > 1) {
        productToIncrement.orderQuantity -= 1;
        return;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.address = "";
      state.city = "";
      state.phone = "";
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateShippingAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});
export const orderedProductsSelector = (state: RootState) => {
  return state.cart.items;
};
export const subTotalSelector = (state: RootState) => {
  return state.cart.items.reduce((acc, item) => {
    return acc + item.price * item.orderQuantity;
  }, 0);
};

export const shippingCostSelector = (state: RootState) => {
  if (
    state.cart.city &&
    state.cart.city === "Dhaka" &&
    state.cart.items.length > 0
  ) {
    return 60;
  } else if (
    state.cart.city &&
    state.cart.city !== "Dhaka" &&
    state.cart.items.length > 0
  ) {
    return 120;
  } else {
    return 0;
  }
};
export const citySelector = (state: RootState) => {
  return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
  return state.cart.address;
};
export const phoneSelector = (state: RootState) => {
  return state.cart.phone;
};

export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector(state);

  return subTotal + shippingCost;
};
export const orderSelector = (state: RootState) => {
  return {
    medicines: state.cart.items.map((item) => ({
      medicine: item._id,
      quantity: item.orderQuantity,
    })),
    shippingInfo: {
      address: state.cart.address,
      city: state.cart.city,
      phone: state.cart.phone,
    },
    shippingFee: shippingCostSelector(state),
  };
};
export const {
  addCart,
  clearCart,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeFromCart,
  updateCity,
  updateShippingAddress,
} = cartSlice.actions;

export default cartSlice.reducer;
