import { normalizeProviders } from './normalizeProviders';
import { providersAPIMock, providersMock } from '../mock/provider.mock';

describe('NormalizeProviders', () => {
	it('Should normalize providers API data', () => {
		const result = normalizeProviders(providersAPIMock);

		// Verifica que el resultado sea igual al mock normalizado.
		expect(result).toEqual(providersMock);
	});

	it('Should throw an error if name or description is undefined', () => {
		const badData = [...providersAPIMock, { id: '12' }];

		expect(() => normalizeProviders(badData)).toThrow(
			'Name or description is undefined',
		);
	});
});
