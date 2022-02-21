import {createSlice} from "@reduxjs/toolkit";

interface IProps  {
    currency: string
}

const initialState: IProps = {
    currency: ''
}

export const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        addCurrencyValue(state, action) {
            state.currency = action.payload
        }
    },
});
export const {addCurrencyValue} = currencySlice.actions;
export const selectorCurrency = ({currency}:any) => currency
export default currencySlice.reducer;