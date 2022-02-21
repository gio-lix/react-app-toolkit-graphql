import {createSlice, current} from "@reduxjs/toolkit";

interface ICartItems  {
    cartItems: any
}

const initialState: ICartItems = {
    cartItems: []
}

export const orderSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const product = action.payload
            const exist = current(state?.cartItems)?.find((e: any) => e.id === product.id)
            if (!exist) {
                state.cartItems.push({...product, qty: 1})
                return
            }
            if (exist) {
                state.cartItems = state.cartItems.map((e: any) => e.id === product.id ? {...product, qty: e.qty + 1} : e)
            }
            return;
        },
        minusQty(state, action) {
            const product = action.payload
            state.cartItems = state.cartItems.map((e: any) => e.id === product.id ? {...product, qty: e.qty - 1} : e)
        },
        deleteItem(state, action) {
            state.cartItems = state.cartItems.filter((e: any) => e.id !== action.payload)
        },
        updateValue(state, action) {
            const {id, name, value} = action.payload
            state.cartItems?.map((e: any) => {
                if (e.id === id) {
                    e.allDefaultSizes.map((el: any) => {
                        if (el.name === name) {
                            el.name = name
                            el.id = value
                        }
                        return el
                    })
                }
                return e
            })
        }

    },
});
export const {addToCart, deleteItem, minusQty, updateValue} = orderSlice.actions;
export const selectOrderSlice = ({cart}:any) => cart
export default orderSlice.reducer;