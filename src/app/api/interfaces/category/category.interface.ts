import { ID } from '../rate/rate.interface';
export interface Category {
    id: ID;
    name: string;
    color: string;
    description: string;
    photo: string;
}
