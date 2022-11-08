import { ID } from './../../api/interfaces/rate/rate.interface';
export interface Address {
    id: ID;
    name: string;
    details: string;
    locationData: {
        name: string;
        latitude: number;
        longitude: number;
    };
    selected: boolean;
}
