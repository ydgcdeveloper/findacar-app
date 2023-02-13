import { Place } from './request.interface';

export interface Address {
    id: number;
    name: string;
    description: string;
    details: string;
    locationData: Place;
    selected: boolean;
}
