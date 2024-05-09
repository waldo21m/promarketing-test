import Page from './page';
import { render, screen } from '../utils/test-utils';

describe('Simple working test', () => {
	it('The nav button Crear Solicitud is visible', () => {
		expect.hasAssertions();
		render(<Page />);
		expect(screen.getByText(/crear solicitud/i)).toBeInTheDocument();
	});
});
