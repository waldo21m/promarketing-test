'use client';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

const ToastifyProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<>
			<ToastContainer />
			{children}
		</>
	);
};

export default ToastifyProvider;
