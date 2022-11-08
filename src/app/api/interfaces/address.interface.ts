import { ID } from './rate.interface';
import { Place } from './request.interface';

export interface Address {
    id: ID;
    name: string;
    details: string;
    locationData: Place;
    selected: boolean;
}
