import type { Metadata } from 'next';
import StoreProvider from './StoreProvider';
import './globals.css';

export const metadata: Metadata = {
	title: 'Promarketing test',
	description:
		'Resolución de la prueba técnica por parte del equipo técnico de Promarketing, con el objetivo de ampliar el conocimiento sobre las capacidades del entrevistado, así como su manera de trabajar y abarcar la resolución de problemas.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
