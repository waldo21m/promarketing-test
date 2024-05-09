/* eslint-disable no-console */
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import React, { useEffect, useState } from 'react';
import { es } from 'date-fns/locale';
import clsx from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import FormErrorMessage from './FormErrorMessage';
import { toastConfig } from '../utils/toastConfig';
import { type DepositLimitFormInputs } from '../types/depositLimitTypes';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es', es);

const schema = yup.object().shape({
	minimumDepositAmount: yup
		.number()
		.typeError('El monto debe ser un número')
		.integer('El monto no puede contener decimales')
		.min(5000, 'El monto mínimo es de $5000')
		.max(999_999_999, 'El monto máximo es de $999999999')
		.required('Debes ingresar el monto mínimo de deposito'),
	daily: yup
		.number()
		.typeError('El monto debe ser un número')
		.integer('El monto no puede contener decimales')
		.min(5000, 'El monto mínimo es de $5000')
		.max(999_999_999, 'El monto máximo es de $999999999'),
	weekly: yup
		.number()
		.typeError('El monto debe ser un número')
		.integer('El monto no puede contener decimales')
		.min(5000, 'El monto mínimo es de $5000')
		.max(999_999_999, 'El monto máximo es de $999999999'),
	monthly: yup
		.number()
		.typeError('El monto debe ser un número')
		.integer('El monto no puede contener decimales')
		.min(5000, 'El monto mínimo es de $5000')
		.max(999_999_999, 'El monto máximo es de $999999999'),
	startDate: yup.date().required('Debes ingresar la fecha de autolimitación'),
	reason: yup
		.string()
		.required('Debes ingresar el motivo')
		.matches(/^[\d\sa-záéíñóúü]*$/i, 'El motivo que ingresaste no es válido')
		.min(8, 'Debe tener al menos 8 caracteres')
		.max(255, 'No puede tener más de 255 caracteres'),
});

const DepositLimit: React.FC = () => {
	const [startDate, setStartDate] = useState<Date | null | undefined>(null);
	const [firstStartDateOnBlur, setFirstStartDateOnBlur] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
		setError,
		clearErrors,
		trigger,
		reset,
	} = useForm<DepositLimitFormInputs>({
		resolver: yupResolver(schema),
	});

	const [daily, weekly, minimumDepositAmount] = watch([
		'daily',
		'weekly',
		'minimumDepositAmount',
	]);

	useEffect(() => {
		if (daily && minimumDepositAmount && daily < minimumDepositAmount) {
			setError('daily', {
				type: 'manual',
				message: 'El monto Diario debe ser mayor al monto mínimo de depósito',
			});
		} else if (daily && weekly && daily > weekly) {
			setError('daily', {
				type: 'manual',
				message: 'El monto Diario debe ser menor al monto Semanal',
			});
		} else {
			clearErrors('daily');
		}
	}, [clearErrors, daily, minimumDepositAmount, setError, weekly]);

	// useEffect(() => {
	// 	if (daily && weekly && daily > weekly) {
	// 		setError('daily', {
	// 			type: 'manual',
	// 			message: 'El monto Diario debe ser menor al monto Semanal',
	// 		});
	// 	} else {
	// 		clearErrors('daily');
	// 	}

	// 	if (daily && monthly && daily > monthly) {
	// 		setError('daily', {
	// 			type: 'manual',
	// 			message: 'El monto Diario debe ser menor al monto Mensual',
	// 		});
	// 	} else {
	// 		clearErrors('daily');
	// 	}

	// 	if (weekly && daily && weekly < daily) {
	// 		setError('weekly', {
	// 			type: 'manual',
	// 			message: 'El monto Semanal debe ser mayor al monto Diario',
	// 		});
	// 	} else {
	// 		clearErrors('weekly');
	// 	}

	// 	if (weekly && monthly && weekly > monthly) {
	// 		setError('weekly', {
	// 			type: 'manual',
	// 			message: 'El monto Semanal debe ser menor al monto Mensual',
	// 		});
	// 	} else {
	// 		clearErrors('weekly');
	// 	}

	// 	if (monthly && daily && monthly < daily) {
	// 		setError('monthly', {
	// 			type: 'manual',
	// 			message: 'El monto Mensual debe ser mayor al monto Diario',
	// 		});
	// 	} else {
	// 		clearErrors('monthly');
	// 	}

	// 	if (monthly && weekly && monthly < weekly) {
	// 		setError('monthly', {
	// 			type: 'manual',
	// 			message: 'El monto Mensual debe ser mayor al monto Semanal',
	// 		});
	// 	} else {
	// 		clearErrors('monthly');
	// 	}

	// 	if (daily && daily < minimumDepositAmount) {
	// 		setError('daily', {
	// 			type: 'manual',
	// 			message: 'El monto Diario debe ser mayor al monto mínimo de depósito',
	// 		});
	// 	} else {
	// 		clearErrors('daily');
	// 	}

	// 	if (weekly && weekly < minimumDepositAmount) {
	// 		setError('weekly', {
	// 			type: 'manual',
	// 			message: 'El monto Semanal debe ser mayor al monto mínimo de depósito',
	// 		});
	// 	} else {
	// 		clearErrors('weekly');
	// 	}

	// 	if (monthly && monthly < minimumDepositAmount) {
	// 		setError('monthly', {
	// 			type: 'manual',
	// 			message: 'El monto Mensual debe ser mayor al monto mínimo de depósito',
	// 		});
	// 	} else {
	// 		clearErrors('monthly');
	// 	}
	// }, [clearErrors, daily, minimumDepositAmount, monthly, setError, weekly]);

	const isWeekday = (date: Date) => {
		const day = date.getDay();
		return day !== 0 && day !== 6;
	};

	const handleDate = (date: Date) => {
		setStartDate(date);
		setValue('startDate', date);
		trigger('startDate');
	};

	useEffect(() => {
		if (startDate === null && firstStartDateOnBlur) {
			setError('startDate', {
				type: 'manual',
				message: 'Debes ingresar la fecha de autolimitación',
			});
		} else {
			clearErrors('startDate');
		}
	}, [clearErrors, firstStartDateOnBlur, setError, startDate]);

	const onSubmit = (data: DepositLimitFormInputs) => {
		console.log(data);

		toast.success('Límite de deposito creado con éxito', toastConfig);

		reset();
		setStartDate(null);
		setFirstStartDateOnBlur(false);
	};

	return (
		<div className='mt-6'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2 className='text-base md:text-xl mb-6 font-bold text-black uppercase'>
					Defina sus límites de depósito
				</h2>
				<div className='flex flex-col items-center w-full'>
					<input
						{...register('minimumDepositAmount')}
						type='number'
						min='5000'
						max='999999999'
						step='1'
						required
						className={clsx(
							'w-full',
							'sm:w-96',
							'p-3',
							'mb-3',
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
								'border-red-500': !!errors.minimumDepositAmount,
								'focus:ring-red-500': !!errors.minimumDepositAmount,
							},
						)}
						placeholder='Monto mínimo de depósito'
						onBlur={() => {
							trigger('minimumDepositAmount');
						}}
					/>
					<FormErrorMessage
						errorString={errors.minimumDepositAmount?.message}
						className='w-full sm:w-96 mb-3 text-sm text-red-500'
					/>

					<input
						{...register('daily')}
						type='number'
						min='5000'
						max='999999999'
						step='1'
						className={clsx(
							'w-full',
							'sm:w-96',
							'p-3',
							'mb-3',
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
								'border-red-500': !!errors.daily,
								'focus:ring-red-500': !!errors.daily,
							},
						)}
						placeholder='Diario (De 00:00 hasta 24:00 hrs)'
					/>
					<FormErrorMessage
						errorString={errors.daily?.message}
						className='w-full sm:w-96 mb-3 text-sm text-red-500'
					/>

					<input
						{...register('weekly')}
						type='number'
						min='5000'
						max='999999999'
						step='1'
						className={clsx(
							'w-full',
							'sm:w-96',
							'p-3',
							'mb-3',
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
								'border-red-500': !!errors.weekly,
								'focus:ring-red-500': !!errors.weekly,
							},
						)}
						placeholder='Semanal (De lunes a domingo)'
					/>
					<FormErrorMessage
						errorString={errors.weekly?.message}
						className='w-full sm:w-96 mb-3 text-sm text-red-500'
					/>

					<input
						{...register('monthly')}
						type='number'
						min='5000'
						max='999999999'
						step='1'
						className={clsx(
							'w-full',
							'sm:w-96',
							'p-3',
							'mb-3',
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
								'border-red-500': !!errors.monthly,
								'focus:ring-red-500': !!errors.monthly,
							},
						)}
						placeholder='Mensual (Del 1 al 30)'
					/>
					<FormErrorMessage
						errorString={errors.monthly?.message}
						className='w-full sm:w-96 mb-3 text-sm text-red-500'
					/>

					<div className='w-full sm:w-96 mb-3'>
						<DatePicker
							selected={startDate}
							onChange={(date: Date) => handleDate(date)}
							minDate={new Date()}
							filterDate={isWeekday}
							dateFormat='dd/MM/yyyy'
							placeholderText='DD/MM/AAAA*'
							locale='es'
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
									'border-red-500': !!errors.startDate,
									'focus:ring-red-500': !!errors.startDate,
								},
							)}
							onBlur={() => setFirstStartDateOnBlur(true)}
						/>
					</div>
					<FormErrorMessage
						errorString={errors.startDate?.message}
						className='w-full sm:w-96 mb-3 text-sm text-red-500'
					/>

					<textarea
						{...register('reason')}
						rows={4}
						className={clsx(
							'w-full',
							'sm:w-96',
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
								'mb-9': !errors.reason,
								'mb-3': !!errors.reason,
								'border-red-500': !!errors.reason,
								'focus:ring-red-500': !!errors.reason,
							},
						)}
						placeholder='Motivo'
						onBlur={() => {
							trigger('reason');
						}}
					/>
					<FormErrorMessage
						errorString={errors.reason?.message}
						className='w-full sm:w-96 mb-9 text-sm text-red-500'
					/>

					<div className='flex justify-center w-full'>
						<button
							type='submit'
							// disabled={!(isValid && !!startDate)}
							className={clsx(
								'w-full',
								'sm:w-96',
								'py-2',
								'text-white',
								'font-bold',
								'text-base',
								'sm:text-xl',
								'uppercase',
								'rounded-xl',
								'bg-pm-amber-500a',
								'hover:bg-pm-amber-500',
								'focus:bg-pm-amber-500a',
								'focus:ring-1',
								'focus:ring-pm-amber-500',
								'focus:outline-none',
								'disabled:bg-gray-300',
								// {
								// 	'cursor-not-allowed': !isValid,
								// },
							)}
						>
							Enviar
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default DepositLimit;
