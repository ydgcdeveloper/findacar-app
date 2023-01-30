import { ID } from './rate.interface';

export interface Service {
    id: ID;
    name: string;
    status: ServiceStatus;
    address: string;
    schedule: JSON;
    rating: number;
    photo: string;
    pickupTime: string;
}

export enum ServiceStatus {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    DISPONIBLE = 'DISPONIBLE',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    NO_DISPONIBLE = 'NO_DISPONIBLE',
}
