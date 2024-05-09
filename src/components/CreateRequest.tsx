import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import React, { useEffect, useState } from 'react';
import { es } from 'date-fns/locale';
import clsx from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import FormErrorMessage from './FormErrorMessage';
import { type CreateRequestFormInputs } from '../types/createRequestTypes';
import { providersMock } from '../mock/provider.mock';
import 'react-datepicker/dist/react-datepicker.css';

const schema = yup.object().shape({
	providers: yup
		.array()
		.required('Debes seleccionar al menos un proveedor')
		.min(1, 'Debes seleccionar al menos un proveedor'),
	period: yup.string().required('Debes ingresar el periodo'),
	startDate: yup.date().nullable(),
	reason: yup
		.string()
		.required('Debes ingresar el motivo')
		.min(8, 'Debe tener al menos 8 caracteres')
		.max(255, 'No puede tener más de 255 caracteres'),
});

registerLocale('es', es);

const CreateRequest: React.FC = () => {
	const [startDate, setStartDate] = useState<Date | null | undefined>(null);
	const [firstProviderOnBlur, setFirstProviderOnBlur] = useState(false);
	const [firstStartDateOnBlur, setFirstStartDateOnBlur] = useState(false);
	const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		watch,
		setValue,
		setError,
		clearErrors,
		trigger,
	} = useForm<CreateRequestFormInputs>({
		resolver: yupResolver(schema),
		mode: 'onBlur',
	});

	const periodField = watch('period');

	const handleSelectAllChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (event.target.checked) {
			setSelectedProviders(providersMock.map((provider) => `${provider.id}`));
		} else {
			setSelectedProviders([]);
		}
	};

	const handleDate = (date: Date) => {
		setStartDate(date);
		setValue('startDate', date);
		trigger('startDate');
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

	useEffect(() => {
		if (
			periodField === 'Temporal hasta' &&
			startDate === null &&
			firstStartDateOnBlur
		) {
			setError('startDate', {
				type: 'manual',
				message: 'Debes ingresar la fecha fin de la autoexclusión',
			});
		} else {
			clearErrors('startDate');
		}
	}, [clearErrors, firstStartDateOnBlur, periodField, setError, startDate]);

	const checkIsValid = (): boolean => {
		return (
			(isValid && periodField === 'Temporal hasta' && !!startDate) ||
			(isValid && periodField === 'Indefinido')
		);
	};

	const onSubmit = (data: CreateRequestFormInputs) => {
		// eslint-disable-next-line no-console
		console.log(data);
	};

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
											className={clsx(
												'h-6',
												'w-6',
												'rounded-sm',
												'border-gray-400',
												'text-amber-400',
												'focus:ring-amber-400',
												{
													'border-red-500': !!errors.providers,
													'text-red-500': !!errors.providers,
													'focus:ring-red-500': !!errors.providers,
												},
											)}
											onBlur={() => setFirstProviderOnBlur(true)}
										/>
										<label
											htmlFor={`${provider.id}`}
											className={clsx('ml-2', 'text-sm', {
												'text-red-500': !!errors.providers,
											})}
										>
											{provider.name}
										</label>
									</div>
								);
							})}
						</div>
					)}
					<FormErrorMessage
						errorString={errors.providers?.message}
						className='mt-2 text-sm text-red-500'
					/>
				</div>

				<div className='py-2 px-3.5 bg-pm-gray-100a md:rounded-lg	md:shadow-lg mb-8'>
					<h2 className='text-base md:text-xl mb-6 font-bold uppercase'>
						Por un período de tiempo
					</h2>
					<div
						className={clsx(
							'grid',
							'grid-cols-2',
							'gap-x-2',
							'sm:flex',
							'sm:gap-x-8',
							'items-center',
							{
								'mb-5': !errors.period,
								'mb-2': !!errors.period,
							},
						)}
					>
						<div className='flex items-center'>
							<input
								{...register('period')}
								id='radioTemporary'
								name='period'
								type='radio'
								value='Temporal hasta'
								className={clsx(
									'h-5',
									'w-5',
									'border-gray-400',
									'text-amber-400',
									'focus:ring-amber-400',
									{
										'border-red-500': !!errors.period,
										'text-red-500': !!errors.period,
										'focus:ring-red-500': !!errors.period,
									},
								)}
							/>
							<label
								htmlFor='radioTemporary'
								className={clsx('ml-2', 'text-sm', {
									'text-red-500': !!errors.period,
								})}
							>
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
								className={clsx(
									'h-5',
									'w-5',
									'border-gray-400',
									'text-amber-400',
									'focus:ring-amber-400',
									{
										'border-red-500': !!errors.period,
										'text-red-500': !!errors.period,
										'focus:ring-red-500': !!errors.period,
									},
								)}
							/>
							<label
								htmlFor='radioUndefined'
								className={clsx('ml-2', 'text-sm', {
									'text-red-500': !!errors.period,
								})}
							>
								Indefinido
							</label>
						</div>
					</div>
					<FormErrorMessage
						errorString={errors.period?.message}
						className='mb-5 text-sm text-red-500'
					/>

					<div className='w-full sm:w-80 mb-2'>
						<DatePicker
							selected={startDate}
							onChange={(date: Date) => handleDate(date)}
							minDate={new Date()}
							dateFormat='dd/MM/yyyy'
							placeholderText='DD/MM/AAAA*'
							locale='es'
							disabled={periodField === 'Indefinido' || periodField === null}
							className={clsx(
								'w-full',
								'p-3',
								'text-xs',
								'placeholder:text-pm-neutral-200',
								'rounded-xl',
								'border-gray-400',
								'shadow-sm',
								'focus:border-pm-amber-500',
								'focus:ring-1',
								'focus:ring-pm-amber-500',
								'focus:ring-opacity-50',
								'disabled:bg-slate-50',
								'disabled:text-slate-500',
								'disabled:border-slate-200',
								'disabled:shadow-none',
								{
									'border-red-500': !!errors.startDate,
									'focus:ring-red-500': !!errors.startDate,
								},
							)}
							onBlur={() => setFirstStartDateOnBlur(true)}
						/>
					</div>
					<FormErrorMessage
						errorString={errors.startDate?.message}
						className='mb-2 text-sm text-red-500'
					/>

					<textarea
						{...register('reason')}
						rows={4}
						className={clsx(
							'w-full',
							'p-3',
							'text-xs',
							'placeholder:text-pm-neutral-200',
							'rounded-xl',
							'border-gray-400',
							'shadow-sm',
							'focus:border-pm-amber-500',
							'focus:ring-1',
							'focus:ring-pm-amber-500',
							'focus:ring-opacity-50',
							{
								'border-red-500': !!errors.reason,
								'focus:ring-red-500': !!errors.reason,
							},
						)}
						placeholder='Motivo'
					/>
					<FormErrorMessage
						errorString={errors.reason?.message}
						className='mt-2 text-sm text-red-500'
					/>
				</div>

				<div className='flex justify-center w-full'>
					<button
						type='submit'
						disabled={!checkIsValid()}
						className={clsx(
							'w-full',
							'sm:w-80',
							'py-3.5',
							'text-white',
							'font-bold',
							'text-base',
							'sm:text-xl',
							'uppercase',
							'rounded-xl',
							'bg-pm-blue-900',
							'hover:bg-pm-blue-500',
							'focus:bg-pm-blue-900',
							'focus:ring-1',
							'focus:ring-pm-blue-500',
							'focus:outline-none',
							'disabled:bg-gray-300',
							{
								'cursor-not-allowed': !isValid,
							},
						)}
					>
						Enviar
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateRequest;
