import Page from './page';
import { fireEvent, render, screen } from '../utils/test-utils';

describe('Simple working test', () => {
	it('The title Next.js is visible', () => {
		expect.hasAssertions();
		render(<Page />);
		expect(screen.getByText(/next.js/i)).toBeInTheDocument();
	});

	it('Should increment count on click', () => {
		expect.hasAssertions();
		render(<Page />);
		const button = screen.getByText(/count is/i);
		expect(button).toBeInTheDocument();
		fireEvent.click(button);
		expect(screen.getByText(/count is 1/i)).toBeInTheDocument();
	});
});
