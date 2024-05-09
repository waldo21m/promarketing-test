export interface DepositLimitFormInputs {
	minimumDepositAmount: number;
	daily?: number;
	weekly?: number;
	monthly?: number;
	startDate: Date;
	reason: string;
}

export type FieldName =
	| 'minimumDepositAmount'
	| 'daily'
	| 'weekly'
	| 'monthly'
	| 'startDate'
	| 'reason';
