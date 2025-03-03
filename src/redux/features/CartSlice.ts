import { IProduct } from "@/types/medicine";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { addCoupon } from "@/services/cart";
export interface ICartProduct extends IProduct {
  orderQuantity: number;
}
interface InitialState {
  medicines: ICartProduct[];
  city: string;
  shippingAddress: string;
  shopId: string;
}
const initialState: InitialState = {
  medicines: [],
  city: "",
  shippingAddress: "",
  shopId: "",
};
export const fetchCoupon = createAsyncThunk(
  "cart/fetchCoupon",
  async ({
    shopId,
    subTotal,
    couponCode,
  }: {
    shopId: string;
    subTotal: number;
    couponCode: string;
  }) => {
    try {
      const res = await addCoupon({ shopId, subTotal, couponCode });
      return res;
    } catch (error: any) {
      console.log(error);
      throw new Error(error?.message);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (state.medicines.length === 0) {
        state.shopId = action.payload.shop._id;
      }
      const productToAdd = state.medicines.find(
        (medicine) => medicine._id === action.payload._id
      );
      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        return;
      }
      state.medicines.push({ ...action.payload, orderQuantity: 1 });
    },
    incrementOrderQuantity: (state, action) => {
      const productIncrement = state.medicines.find(
        (medicine) => medicine._id === action.payload
      );
      if (
        productIncrement &&
        productIncrement.orderQuantity < productIncrement.stock
      ) {
        productIncrement.orderQuantity += 1;
        return;
      }
    },
    decrementOrderQuantity: (state, action) => {
      const productDecrement = state.medicines.find(
        (medicine) => medicine._id === action.payload
      );
      if (productDecrement && productDecrement.orderQuantity > 1) {
        productDecrement.orderQuantity -= 1;
        return;
      }
    },
    removeProduct: (state, action) => {
      state.medicines = state.medicines.filter(
        (medicine) => medicine._id !== action.payload
      );
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updateShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    clearCart: (state) => {
      state.city = "";
      state.medicines = [];
      state.shippingAddress = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoupon.pending, (state, action) => {});
    builder.addCase(fetchCoupon.rejected, (state, action) => {});
    builder.addCase(fetchCoupon.fulfilled, (state, action) => {});
  },
});
// medicine
export const orderProductSelector = (state: RootState) => {
  return state.cart.medicines;
};
export const orderSelector = (state: RootState) => {
  return {
    medicines: state.cart.medicines.map((medicine) => ({
      medicine: medicine._id,
      quantity: medicine.orderQuantity,
      color: "White",
    })),
    shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
    paymentMethod: "Online",
  };
};
export const shopSelector = (state: RootState) => {
  return state.cart.shopId;
};
//payment
export const subTotalSelector = (state: RootState) => {
  return state.cart.medicines.reduce((acc, medicine) => {
    if (medicine.offerPrice) {
      return acc + medicine.offerPrice * medicine.orderQuantity;
    } else {
      return acc + medicine.price * medicine.orderQuantity;
    }
  }, 0);
};
export const shippingCostSelector = (state: RootState) => {
  if (
    state.cart.city &&
    state.cart.city === "Dhaka" &&
    state.cart.medicines.length > 0
  ) {
    return 60;
  } else if (
    state.cart.city &&
    state.cart.city !== "Dhaka" &&
    state.cart.medicines.length > 0
  ) {
    return 120;
  } else {
    return 0;
  }
};
export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector(state);

  return subTotal + shippingCost;
};
// address
export const citySelector = (state: RootState) => {
  return state.cart.city;
};
export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};
export const {
  addProduct,
  incrementOrderQuantity,
  decrementOrderQuantity,
  removeProduct,
  updateCity,
  updateShippingAddress,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
