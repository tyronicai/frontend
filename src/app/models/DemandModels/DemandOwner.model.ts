export class DemandOwner {
	Id: number;
	DemandId: number;
	Title: string;
	Name: string;
	EMail: string;
	CountryPhoneCode: string;
	PhoneNumber: string;
	PreferredCulture: string;
	AlternativeCulture: string;

	public generateStrippedDeepClone(): DemandOwner {
		return Object.assign({}, this);
	}
}
