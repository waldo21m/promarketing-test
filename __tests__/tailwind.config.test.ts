import tailwindConfig from '../tailwind.config.js';

describe('Tailwind Configuration', () => {
	it('Should have content, theme and plugins', () => {
		expect(tailwindConfig.content).toBeDefined();
		expect(tailwindConfig.theme).toBeDefined();
		expect(tailwindConfig.plugins).toBeDefined();
	});
});
