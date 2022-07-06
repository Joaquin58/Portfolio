import { configureStore, ThunkAction, Action, MiddlewareArray } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { rootReducer } from "app/Reducers/reducer"
import thunkMiddleware from "redux-thunk";

export const store = configureStore({
    reducer: rootReducer,
    middleware: new MiddlewareArray().concat(thunkMiddleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;