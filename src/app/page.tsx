'use client';
import { useAppDispatch } from '../lib/hooks';
import { incrementByAmount, usePageSelector } from '../lib/features/pageSlice';
import './page.css';

const Home = () => {
	const dispatch = useAppDispatch();
	const { count } = usePageSelector();

	return (
		<>
			<h1 className='text-2xl md:text-4xl mb-2'>Next.js</h1>
			<div>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'
					onClick={() => dispatch(incrementByAmount(1))}
				>
					count is {count}
				</button>
				<p className='text-sm md:text-lg text-gray-700'>
					Edit <code>src/Main.page.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs text-xs md:text-sm text-gray-500'>
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
};

export default Home;
