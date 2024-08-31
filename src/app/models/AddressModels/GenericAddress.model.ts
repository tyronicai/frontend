export class GenericAddress {
	Id: number;

	CountryId: number;
	Town: string;
	PlaceName: string;

	PostCode: string;
	Street: string;
	HouseNumber: string;
	GenericAddressTypeId: number;

	public generateStrippedDeepClone(): GenericAddress {
		let lclGenericAddress: GenericAddress = Object.assign({}, this);
		return lclGenericAddress;
	}
}
