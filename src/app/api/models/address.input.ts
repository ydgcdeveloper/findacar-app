import { Place } from './../interfaces/request.interface';

export class AddressInput{
    name: string;
    details?: string;
    description: string;
    locationData?: Place;
    selected?: boolean;
}
