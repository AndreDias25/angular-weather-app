export interface Country {
	iD: string;
	localizedName: string;
}

export interface AdministrativeArea {
	iD: string;
	localizedName: string;
}

export interface CityAutoComplete {
	version: number;
	key: string;
	type: string;
	rank: number;
	localizedName: string;
	country: Country;
	administrativeArea: AdministrativeArea;
}

