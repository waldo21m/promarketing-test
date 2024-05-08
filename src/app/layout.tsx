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
			<body className='text-sm	text-gray-600 md:text-base'>
				<StoreProvider>
					<div className='w-full min-h-screen px-4 py-8 bg-white sm:pt-16'>
						{children}
					</div>
				</StoreProvider>
			</body>
		</html>
	);
}
