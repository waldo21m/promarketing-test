import { useSelector } from 'react-redux';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type AppState } from '../App.store';

interface PageState {
	count: number;
}

export const initialState: PageState = {
	count: 0,
};

export const pageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {
		increment: (state) => {
			state.count += 1;
		},
		decrement: (state) => {
			state.count -= 1;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.count += action.payload;
		},
	},
});

export const { increment, decrement, incrementByAmount } = pageSlice.actions;

export const usePageSelector = () =>
	useSelector<AppState, PageState>(({ [pageSlice.name]: slice }) => slice);

export default pageSlice.reducer;
