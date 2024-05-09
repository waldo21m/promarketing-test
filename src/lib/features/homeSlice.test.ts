import { afterEach, describe, expect, it, vi } from 'vitest';
import reducer, { fetchProviders, initialState } from './homeSlice';
import { FetchStatutes } from '../../utils/fetchStatuses.enum';
import { providersMock } from '../../mock/provider.mock';

describe('homeSlice', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Should redux createSlice', () => {
		expect(reducer).not.toBeNull();
	});

	it('Handles fetchProviders.pending', () => {
		const action = { type: fetchProviders.pending.type };
		const state = reducer(initialState, action);

		expect(state.status).toEqual(FetchStatutes.Loading);
	});

	it('Handles fetchProviders.fulfilled', () => {
		const action = {
			type: fetchProviders.fulfilled.type,
			payload: providersMock,
		};
		const state = reducer(initialState, action);

		expect(state.providers).toEqual(providersMock);
		expect(state.status).toEqual(FetchStatutes.Succeeded);
	});

	it('Handles fetchProviders.rejected', () => {
		const action = { type: fetchProviders.rejected.type };
		const state = reducer(initialState, action);

		expect(state.status).toEqual(FetchStatutes.Failed);
		expect(state.error).toEqual(
			'Error al consultar providers, intente más tarde...',
		);
	});
});
