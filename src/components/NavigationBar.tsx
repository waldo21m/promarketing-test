import React from 'react';
import clsx from 'clsx';
import { type NavigationBarProps } from '../types/navigationBarTypes';

const NavigationBar: React.FC<NavigationBarProps> = ({
	activeTab,
	setActiveTab,
}) => {
	return (
		<div>
			<button
				className={clsx(
					'px-2',
					'pb-4',
					'border-b-2',
					'hover:border-pm-blue-500',
					'hover:text-pm-blue-500',
					{
						'border-pm-blue-900': activeTab === 1,
						'text-pm-blue-900': activeTab === 1,
						'border-pm-gray-100': activeTab !== 1,
						'text-pm-blue-500': activeTab !== 1,
					},
				)}
				onClick={() => setActiveTab(1)}
			>
				Crear Solicitud
			</button>
			<button
				className={clsx(
					'px-5',
					'pb-4',
					'border-b-2',
					'hover:border-pm-blue-500',
					'hover:text-pm-blue-500',
					{
						'border-pm-blue-900': activeTab === 2,
						'text-pm-blue-900': activeTab === 2,
						'border-pm-gray-100': activeTab !== 2,
						'text-pm-blue-500': activeTab !== 2,
					},
				)}
				onClick={() => setActiveTab(2)}
			>
				Límite de depósito
			</button>
		</div>
	);
};

export default NavigationBar;
