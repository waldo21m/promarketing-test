/* eslint-disable unicorn/no-keyword-prefix */
import { vi } from 'vitest';
import RootLayout from './layout';
import { render, screen } from '../utils/test-utils';

vi.mock('next/font/google', () => ({
	Inter: () => ({ className: 'mocked-font-class' }),
}));

describe('RootLayout', () => {
	it('Should render the children', () => {
		expect.hasAssertions();
		const testText = 'This is a test child';
		render(<RootLayout>{testText}</RootLayout>);

		expect(screen.getByText(testText)).toBeInTheDocument();
	});
});
