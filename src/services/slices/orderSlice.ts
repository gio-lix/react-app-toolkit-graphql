import {createSlice} from "@reduxjs/toolkit";

interface ICartItems  {
    cartItems: any
}

const initialState: ICartItems = {
    cartItems: []
}

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addToCart(state, action) {
            state.cartItems.push(action.payload)
        }
    },
});
export const {addToCart} = orderSlice.actions;
export default orderSlice.reducer;