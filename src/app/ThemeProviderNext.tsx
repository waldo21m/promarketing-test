'use client';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import theme from '../lib/theme';

const ThemeProviderNext = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider theme={theme}>
			<StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
		</ThemeProvider>
	);
};

export default ThemeProviderNext;
