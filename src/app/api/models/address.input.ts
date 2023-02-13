import { Place } from './../interfaces/request.interface';

export class AddressInput{
    id?: number;
    name: string;
    details?: string;
    description: string;
    locationData?: Place;
    selected?: boolean;
}
