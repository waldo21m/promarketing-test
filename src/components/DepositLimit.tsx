import Datepicker, {
	type DateRangeType,
	type DateValueType,
} from 'react-tailwindcss-datepicker';
import React, { useState } from 'react';

const DepositLimit: React.FC = () => {
	const [value, setValue] = useState<DateRangeType | null>({
		startDate: null,
		endDate: null,
	});

	const handleValueChange = (exampleValue: DateValueType) => {
		// eslint-disable-next-line no-console
		console.log('newValue:', exampleValue);
		setValue(exampleValue);
	};

	return (
		<div className='mt-6'>
			<h2 className='text-base md:text-xl mb-6 font-bold text-black uppercase'>
				Defina sus límites de depósito
			</h2>
			<div className='flex flex-col items-center w-full'>
				<input
					type='text'
					className='w-full sm:w-96 p-3 mb-3 text-xs placeholder:text-pm-neutral-200 rounded-xl border-gray-400 shadow-sm focus:border-pm-amber-500 focus:ring-1 focus:ring-pm-amber-500 focus:ring-opacity-50'
					placeholder='Monto mínimo de depósito'
				/>

				<input
					type='text'
					className='w-full sm:w-96 p-3 mb-3 text-xs placeholder:text-pm-neutral-200 rounded-xl border-gray-400 shadow-sm focus:border-pm-amber-500 focus:ring-1 focus:ring-pm-amber-500 focus:ring-opacity-50'
					placeholder='Diario (De 00:00 hasta 24:00 hrs)'
				/>

				<input
					type='text'
					className='w-full sm:w-96 p-3 mb-3 text-xs placeholder:text-pm-neutral-200 rounded-xl border-gray-400 shadow-sm focus:border-pm-amber-500 focus:ring-1 focus:ring-pm-amber-500 focus:ring-opacity-50'
					placeholder='Semanal (De lunes a domingo)'
				/>

				<input
					type='text'
					className='w-full sm:w-96 p-3 mb-3 text-xs placeholder:text-pm-neutral-200 rounded-xl border-gray-400 shadow-sm focus:border-pm-amber-500 focus:ring-1 focus:ring-pm-amber-500 focus:ring-opacity-50'
					placeholder='Mensual (Del 1 al 30)'
				/>

				<div className='w-full sm:w-96 mb-9'>
					<Datepicker
						i18n='es'
						primaryColor='amber'
						useRange={false}
						asSingle
						readOnly
						popoverDirection='up'
						value={value}
						onChange={handleValueChange}
						placeholder='DD/MM/AAAA*'
						displayFormat='DD/MM/YYYY'
						minDate={new Date()}
						inputClassName='w-full p-3 text-xs placeholder:text-pm-neutral-200 rounded-xl border-gray-400 shadow-sm focus:border-pm-amber-500 focus:ring-1 focus:ring-pm-amber-500 focus:ring-opacity-50'
					/>
				</div>

				<div className='flex justify-center w-full'>
					<button
						type='button'
						className='w-full sm:w-96 py-2 text-white font-bold text-base sm:text-xl uppercase rounded-xl bg-pm-amber-500a hover:bg-pm-amber-500 focus:bg-pm-amber-500a focus:ring-1 focus:ring-pm-amber-500 focus:outline-none'
					>
						Enviar
					</button>
				</div>
			</div>
		</div>
	);
};

export default DepositLimit;
