import { type Provider, type ProviderAPI } from '../types/providerTypes';

export const normalizeProviders = (data: ProviderAPI[]): Provider[] => {
	return data.map((item) => {
		const name = item.name || item.Name;
		const description = item.description || item.Descripcion;

		if (!name || !description) {
			throw new Error('Name or description is undefined');
		}

		return {
			id: Number(item.id),
			name,
			description,
		};
	});
};
