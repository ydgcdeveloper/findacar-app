import { ID } from '../../api/interfaces/rate.interface';
export interface Address {
    id: number;
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
