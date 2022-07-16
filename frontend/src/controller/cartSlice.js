import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from './utils';
import { getOrderAsync, submitOrderAsync, changeStatusAsync } from '../component/cart/cartThunks';

const INITIAL_STATE = {
  cart: [ 
    {
      id: "8888",
      name: "egg",
      soldBy: "1234",
      price: 0,
      quantity: 1
    }
],
  sum: 0,
  submitOrder: REQUEST_STATE.IDLE,
  getOrder: REQUEST_STATE.IDLE,
  changeStatus: REQUEST_STATE.IDLE,
  addProductToCart: REQUEST_STATE.IDLE
}

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    updateQuantity(state, action) {
      let newValue = parseInt(action.payload.quantity);
      if (newValue >= 0) {
      let productToChange = state.cart.find(p => p.id === action.payload.id);
      let diff = newValue- productToChange.quantity 
      state.cart = state.cart.filter(p => p.id !== action.payload.id);
      productToChange.quantity= newValue;
      state.cart.sum += productToChange.price * diff;
      state.cart.push(productToChange);
      state.cart.sort((a,b) => a.name.localeCompare(b.name));
      }
    },
    deleteProduct(state,action) {
      let productToChange = state.cart.find(p => p.id === action.payload.id)
      state.cart.sum -= productToChange.price * productToChange.quantity
      state.cart = state.cart.filter(p => p.id !== action.payload.id)
    },
    addProduct(state, action) {
      let product = state.cart.find(p => p.id === action.payload.uuid);
      if (product !== undefined) {
        const index = state.cart.indexOf(product);
        ++state.cart[index].quantity;
        state.cart.sum += state.cart[index].price;
      } else {
        state.cart.push({
          id: action.payload.uuid,
          name: action.payload.name,
          soldBy: action.payload.soldBy,
          price: 0,
          quantity: 1});
        state.cart.sum += 0;
      }
    }
  },
  extraReducers: (builder) => {
    builder 
    .addCase(submitOrderAsync.pending, (state) => {
      state.submitOrder = REQUEST_STATE.PENDING;
      state.error = null;
    })
    .addCase(submitOrderAsync.fulfilled, (state,action) => {
      state.submitOrder = REQUEST_STATE.FULFILLED;
      state.cart = [];
    })
    .addCase(submitOrderAsync.rejected, (state,action) => {
      state.submitOrder = REQUEST_STATE.REJECTED;
      state.error = action.error;
    })
    .addCase(getOrderAsync.pending, (state) => {
      state.getOrder = REQUEST_STATE.PENDING;
      state.error = null;
    })
    .addCase(getOrderAsync.fulfilled, (state, action) => {
      state.getOrder = REQUEST_STATE.FULFILLED;
      state.cart = action.payload;
    })
    .addCase(getOrderAsync.rejected, (state, action) => {
      state.getOrder = REQUEST_STATE.REJECTED;
      state.error = action.error;
    })
    .addCase(changeStatusAsync.pending, (state) => {
      state.changeStatus = REQUEST_STATE.PENDING;
      state.error = null;
    })
    .addCase(changeStatusAsync.fulfilled, (state, action) => {
      state.changeStatus = REQUEST_STATE.FULFILLED;
    })
    .addCase(changeStatusAsync.rejected, (state, action) => {
      state.changeStatus = REQUEST_STATE.REJECTED;
      state.error = action.error;
    })
}
})

export const { updateQuantity, deleteProduct, addProduct } =
  cartSlice.actions;

// ------------------ Getters ------------------- // 
export const getCart = (state) => state.cart.cart;

export default cartSlice.reducer;