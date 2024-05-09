/* eslint-disable no-console */
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import React, { useEffect, useState } from 'react';
import { es } from 'date-fns/locale';
import { yupResolver } from '@hookform/resolvers/yup';
import { providersMock } from '../mock/provider.mock';
import 'react-datepicker/dist/react-datepicker.css';

const schema = yup.object().shape({
	providers: yup
		.array()
		.min(1, 'Al menos un proveedor debe estar seleccionado'),
	period: yup.string().required('Este campo es obligatorio'),
	reason: yup
		.string()
		.required('Este campo es obligatorio')
		.min(8, 'Debe tener al menos 8 caracteres')
		.max(255, 'No puede tener más de 255 caracteres'),
});

registerLocale('es', es);

const CreateRequest: React.FC = () => {
	const [startDate, setStartDate] = useState<Date>();
	const [firstProviderOnBlur, setFirstProviderOnBlur] = useState(false);
	const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
		trigger,
	} = useForm<any>({
		resolver: yupResolver(schema),
		mode: 'onBlur',
	});

	const handleSelectAllChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (event.target.checked) {
			setSelectedProviders(providersMock.map((provider) => `${provider.id}`));
		} else {
			setSelectedProviders([]);
		}
	};

	useEffect(() => {
		if (firstProviderOnBlur) {
			setValue('providers', selectedProviders);
			trigger('providers');
		}
	}, [firstProviderOnBlur, selectedProviders, setValue, trigger]);

	const handleProviderCheck = (providerId: string) => {
		if (selectedProviders.includes(providerId)) {
			setSelectedProviders(selectedProviders.filter((id) => id !== providerId));
		} else {
			setSelectedProviders([...selectedProviders, providerId]);
		}
	};

	useEffect(() => {
		if (selectedProviders.length < providersMock.length) {
			setValue('selectAll', false);
		}
	}, [selectedProviders, setValue]);

	const onSubmit = (data: any) => {
		console.log(data);
	};

	console.log(errors, isValid);

	return (
		<div className='mt-2.5'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='py-2 px-3.5 bg-pm-gray-100a md:rounded-lg	md:shadow-lg mb-3.5'>
					<h2 className='text-base md:text-xl mb-4 font-bold uppercase'>
						Autoexclusión proveedores
					</h2>
					<div className='flex items-center mb-2'>
						<input
							{...register('selectAll')}
							id='allCheckbox'
							type='checkbox'
							value='all'
							className='form-checkbox h-6 w-6 rounded-sm border-gray-400 text-amber-400 focus:ring-amber-400'
							onBlur={() => setFirstProviderOnBlur(true)}
							onChange={handleSelectAllChange}
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
											{...register('providers')}
											id={`${provider.id}`}
											type='checkbox'
											value={provider.id}
											checked={selectedProviders.includes(`${provider.id}`)}
											onChange={() => handleProviderCheck(`${provider.id}`)}
											className='h-6 w-6 rounded-sm border-gray-400 text-amber-400 focus:ring-amber-400'
											onBlur={() => setFirstProviderOnBlur(true)}
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
								{...register('period')}
								id='radioTemporary'
								name='period'
								type='radio'
								value='Temporal hasta'
								className='h-5 w-5 border-gray-400 text-amber-400 focus:ring-amber-400'
							/>
							<label htmlFor='radioTemporary' className='ml-2 text-sm'>
								Temporal hasta
							</label>
						</div>

						<div className='flex items-center'>
							<input
								{...register('period')}
								id='radioUndefined'
								name='period'
								type='radio'
								value='Indefinido'
								className='h-5 w-5 border-gray-400 text-amber-400 focus:ring-amber-400'
							/>
							<label htmlFor='radioUndefined' className='ml-2 text-sm'>
								Indefinido
							</label>
						</div>
					</div>

					<div className='w-full sm:w-80 mb-2'>
						<DatePicker
							selected={startDate}
							onChange={(date: Date) => setStartDate(date)}
							minDate={new Date()}
							dateFormat='dd/MM/yyyy'
							placeholderText='DD/MM/AAAA*'
							locale='es'
							className='w-full p-3 text-xs placeholder:text-pm-neutral-200 rounded-xl border-gray-400 shadow-sm focus:border-pm-amber-500 focus:ring-1 focus:ring-pm-amber-500 focus:ring-opacity-50'
						/>
					</div>

					<textarea
						{...register('reason')}
						rows={4}
						className='w-full p-3 text-xs placeholder:text-pm-neutral-200 rounded-xl border-gray-400 shadow-sm focus:border-pm-amber-500 focus:ring-1 focus:ring-pm-amber-500 focus:ring-opacity-50'
						placeholder='Motivo'
					/>
				</div>

				<div className='flex justify-center w-full'>
					<button
						type='submit'
						className='w-full sm:w-80 py-3.5 text-white font-bold text-base sm:text-xl uppercase rounded-xl bg-pm-blue-900 hover:bg-pm-blue-500 focus:bg-pm-blue-900 focus:ring-1 focus:ring-pm-blue-500 focus:outline-none'
					>
						Enviar
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateRequest;
