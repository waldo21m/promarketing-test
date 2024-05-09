'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Flanders404 from '../assets/flanders.png';

const NotFoundPage: React.FC = () => {
	const router = useRouter();

	return (
		<div
			id='errorContainer'
			data-testid='errorContainer'
			className='flex flex-col justify-center items-center'
		>
			<h1 className='text-5xl sm:text-6xl	md:text-7xl lg:text-8xl	mb-2'>
				Lo sentimos
			</h1>
			<Image
				src={Flanders404}
				alt='Page not found'
				className='mb-2'
				width={300}
				height={300}
			/>
			<h5 className='text-lg md:text-xl mb-2'>
				Parece que esta página no existe
			</h5>
			<button
				id='goHomeButton'
				className='w-full sm:w-80 py-2 text-white font-bold text-base uppercase rounded-xl bg-pm-blue-900 hover:bg-pm-blue-500 focus:bg-pm-blue-900 focus:ring-1 focus:ring-pm-blue-500 focus:outline-none'
				data-testid='goHomeButton'
				onClick={() => router.push('/')}
			>
				Ir a la página principal
			</button>
		</div>
	);
};

export default NotFoundPage;
