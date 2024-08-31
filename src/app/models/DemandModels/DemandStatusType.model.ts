export enum EnumDemandStatusType {
	Preparing = 1,
	Published = 2,
	OfferAccepted = 3,
	Done = 4,
	Canceled = 5,
}
export class DemandStatusType {
	Id: number;
	Name: string;
	Description: string;
	IsActive: boolean;
}
