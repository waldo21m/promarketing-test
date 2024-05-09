export interface DepositLimitFormInputs {
	minimumDepositAmount: number;
	daily?: number;
	weekly?: number;
	monthly?: number;
	startDate: Date;
	reason: string;
}
