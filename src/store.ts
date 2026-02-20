import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({ reducer: rootReducer, devTools: true });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
