'use client';
import Datepicker, {
	type DateValueType,
	type DateRangeType,
} from 'react-tailwindcss-datepicker';
import React, { useState } from 'react';
import { providersMock } from '../mock/provider.mock';

const CreateRequest: React.FC = () => {
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
		<div className='mt-2.5'>
			<div className='py-2 px-3.5 bg-pm-gray-100a md:rounded-lg	md:shadow-lg mb-3.5'>
				<h2 className='text-base md:text-xl mb-4 font-bold uppercase'>
					Autoexclusión proveedores
				</h2>
				<div className='flex items-center mb-2'>
					<input
						id='allCheckbox'
						type='checkbox'
						className='form-checkbox h-6 w-6 rounded-sm border-gray-400 text-amber-400 focus:ring-amber-400'
					/>
					<label htmlFor='allCheckbox' className='ml-2 text-sm'>
						Todos
					</label>
				</div>
				<hr className='border-t border-gray-300 mb-4' />
				{providersMock.length > 0 && (
					<div className='grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-2 items-center'>
						{providersMock.map((provider) => {
							return (
								<div key={provider.id} className='flex items-center'>
									<input
										id={`${provider.id}`}
										type='checkbox'
										className='h-6 w-6 rounded-sm border-gray-400 text-amber-400 focus:ring-amber-400'
									/>
									<label htmlFor={`${provider.id}`} className='ml-2 text-sm'>
										{provider.name}
									</label>
								</div>
							);
						})}
					</div>
				)}
			</div>

			<div className='py-2 px-3.5 bg-pm-gray-100a md:rounded-lg	md:shadow-lg mb-8'>
				<h2 className='text-base md:text-xl mb-6 font-bold uppercase'>
					Por un período de tiempo
				</h2>
				<div className='grid grid-cols-2 gap-x-2 sm:flex sm:gap-x-8 items-center mb-5'>
					<div className='flex items-center'>
						<input
							id='radioTemporary'
							name='radioExample'
							type='radio'
							className='h-5 w-5 border-gray-400 text-amber-400 focus:ring-amber-400'
						/>
						<label htmlFor='radioTemporary' className='ml-2 text-sm'>
							Temporal hasta
						</label>
					</div>

					<div className='flex items-center'>
						<input
							id='radioUndefined'
							name='radioExample'
							type='radio'
							className='h-5 w-5 border-gray-400 text-amber-400 focus:ring-amber-400'
						/>
						<label htmlFor='radioUndefined' className='ml-2 text-sm'>
							Indefinido
						</label>
					</div>
				</div>

				<div className='w-full sm:w-80 mb-2'>
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

				<textarea
					rows={4}
					className='w-full p-3 text-xs placeholder:text-pm-neutral-200 rounded-xl border-gray-400 shadow-sm focus:border-pm-amber-500 focus:ring-1 focus:ring-pm-amber-500 focus:ring-opacity-50'
					placeholder='Motivo'
				/>
			</div>

			<div className='flex justify-center w-full'>
				<button
					type='button'
					className='w-full sm:w-80 py-3.5 text-white font-bold text-base sm:text-xl uppercase rounded-xl bg-pm-blue-900 hover:bg-pm-blue-500 focus:bg-pm-blue-900 focus:ring-1 focus:ring-pm-blue-500 focus:outline-none'
				>
					Enviar
				</button>
			</div>
		</div>
	);
};

export default CreateRequest;
