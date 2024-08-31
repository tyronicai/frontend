import { Vehicle } from './Vehicle.model';

export class TransCalRes {
	vehicles: Vehicle[];
	volume: number;
	loadDay: number;
	loadHour: number;
	loadMinute: number;
	loadDuration: string;
	unloadDay: number;
	unloadHour: number;
	unloadMinute: number;
	unloadDuration: string;
	numOfLoadWorker: number;
	numOfUnloadWorker: number;
	distanceInKM: number;
	laborLoadCost: number;
	laborUnloadCost: number;
	fareCost: number;
	accomodationCost: number;
}
