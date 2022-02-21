import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import cartReducers from './slices/orderSlice'
import currencyReducers from './slices/currencySlice'
import {productsApi} from "./queryApi/products";

export const store = configureStore({
    reducer: {
        cart: cartReducers,
        currency: currencyReducers,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;