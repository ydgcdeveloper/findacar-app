import { ID } from '../../api/interfaces/rate.interface';
export interface Address {
    id: ID;
    name: string;
    details: string;
    description: string;
    locationData: {
        name: string;
        latitude: number;
        longitude: number;
    };
    selected: boolean;
}
