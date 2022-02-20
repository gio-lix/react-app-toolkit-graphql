import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {productsApi} from "../services/products";
import cartReducers from '../services/orderSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducers,
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