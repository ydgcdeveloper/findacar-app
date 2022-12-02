import { Place } from './../interfaces/request.interface';

export class AddressInput{
    name: string;
    details?: string;
    locationData: Place;
    selected?: boolean;
}
