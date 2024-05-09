import { useSelector } from 'react-redux';
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import { type AppState } from '../App.store';
import { normalizeProviders } from '../../utils/normalizeProviders';
import { FetchStatutes } from '../../utils/fetchStatuses.enum';
import AxiosClient from '../../utils/AxiosClient';
import { type Provider, type ProviderAPI } from '../../types/providerTypes';
import { type HomeState } from '../../types/homeTypes';

const axiosInstance = AxiosClient.getInstance(
	'https://64b68442df0839c97e15b2a0.mockapi.io/api/v1',
);

export const fetchProviders = createAsyncThunk(
	'providers/fetchProviders',
	async () => {
		const response = await axiosInstance.get<ProviderAPI[]>('/provider');

		return normalizeProviders(response.data);
	},
);

export const initialState: HomeState = {
	providers: [],
	status: FetchStatutes.Idle,
	error: null,
};

export const homeSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProviders.pending, (state) => {
				state.status = FetchStatutes.Loading;
			})
			.addCase(
				fetchProviders.fulfilled,
				(state, action: PayloadAction<Provider[]>) => {
					state.status = FetchStatutes.Succeeded;
					state.providers = action.payload;
				},
			)
			.addCase(fetchProviders.rejected, (state) => {
				state.status = FetchStatutes.Failed;
				state.error = 'Error al consultar providers, intente más tarde...';
			});
	},
});

export const useHomeSelector = () =>
	useSelector<AppState, HomeState>(({ [homeSlice.name]: slice }) => slice);

export default homeSlice.reducer;
