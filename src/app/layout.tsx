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
				<StoreProvider>
					<div className='flex justify-center items-center w-screen min-h-screen bg-gray-200'>
						<div className='flex flex-col justify-center items-center w-full min-h-screen px-4 py-8 bg-neutral-50 md:rounded-lg	md:shadow-lg md:w-4/5 md:min-h-fit xl:w-3/5'>
							{children}
						</div>
					</div>
				</StoreProvider>
			</body>
		</html>
	);
}
