import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { homeSlice } from './features/homeSlice';

export const appReducer = combineReducers({
	[homeSlice.name]: homeSlice.reducer,
});

export const makeStore = () => {
	return configureStore({
		reducer: appReducer,
		devTools: process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production',
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
