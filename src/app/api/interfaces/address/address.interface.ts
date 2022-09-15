import { ID } from '../rate/rate.interface';
import { Place } from '../request/request.interface';

export interface Address {
    id: ID;
    name: string;
    details: string;
    locationData: Place;
    selected: boolean;
}
