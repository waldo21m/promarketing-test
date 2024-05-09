import { type Provider } from './providerTypes';

export interface HomeState {
	providers: Provider[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}
