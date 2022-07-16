import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { quinn } from "../utils/mockFetch";
import { mockBuyer } from "../utils/mockBuyer";
import { fetchAPI } from "../api/client";

export const getProducts = createAsyncThunk('/products/get', async function() {
  return fetchAPI('GET', {}, {}, 'products').then(response => response.json());
});

const INITIAL_STATE = {
  firstName: quinn.firstName,
  lastName: quinn.lastName,
  address: quinn.address,
  email: quinn.email,
  phone: quinn.phone,
  cart: quinn.cart,
  orderHistory:mockBuyer.orderHistory,
  pwd: null,
  error: null,
  displayProducts: []
};
 
const userSlice = createSlice({
  name: "buyer",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, function(state, action) {
      state.displayProducts = action.payload;
    })
    .addCase(getProducts.rejected, function(state, action) {
      console.log(action);
    })
  }
});

export const getFirstName = (state) => state.buyer.firstName;
export const getLastName = (state) => state.buyer.lastName;
export const getAddress = (state) => state.buyer.address;
export const getEmail = (state) => state.buyer.email;
export const getPhone = (state) => state.buyer.phone;
export const getCart = (state) => state.buyer.cart;
export const getOrderHistory = (state) => state.buyer.orderHistory;
export const getDisplayProductList = (state) => state.buyer.displayProducts;

export default userSlice.reducer;
