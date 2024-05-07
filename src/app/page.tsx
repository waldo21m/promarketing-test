'use client';
import { useAppDispatch } from '../lib/hooks';
import { incrementByAmount, usePageSelector } from '../lib/features/pageSlice';
import './page.css';

const Home = () => {
	const dispatch = useAppDispatch();
	const { count } = usePageSelector();

	return (
		<>
			<h1>Next.js</h1>
			<div className='card'>
				<button onClick={() => dispatch(incrementByAmount(1))}>
					count is {count}
				</button>
				<p>
					Edit <code>src/Main.page.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
};

export default Home;
