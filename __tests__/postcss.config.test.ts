import postcssConfig from '../postcss.config.js';

describe('PostCSS Configuration', () => {
	it('Should have tailwindcss plugin', () => {
		expect(postcssConfig.plugins).toHaveProperty('tailwindcss');
	});

	it('Should have autoprefixer plugin', () => {
		expect(postcssConfig.plugins).toHaveProperty('autoprefixer');
	});
});
