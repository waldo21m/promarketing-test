import { expect } from 'vitest';
import nextConfig from '../next.config.mjs';

it('should have an empty nextConfig object', () => {
	expect(Object.keys(nextConfig).length).toBe(0);
});
