export interface ProviderBase {
	name?: string;
	description?: string;
}

export interface ProviderAPI extends ProviderBase {
	id: number | string;
	Name?: string;
	Descripcion?: string;
}

export interface Provider extends ProviderBase {
	id: number;
}
