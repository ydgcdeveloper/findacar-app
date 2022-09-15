import { Place } from '../request/request.interface';

export interface Address {
    id: number;
    name: string;
    details: string;
    locationData: Place;
    selected: boolean;
}
