export interface CreateRequestFormInputs {
	selectAll?: string | boolean;
	providers: string[];
	period: string;
	startDate?: Date | null;
	reason: string;
}
