import { ID } from './../interfaces/rate.interface';
import { SortByTypes } from './../interfaces/filter';
import { Filter } from '../interfaces/filter';

export class FilterInput implements Filter{
    sortBy: SortByTypes;
    onlyAvailable: boolean;
    priceRange: {
        lower: number;
        upper: number;
    };
    categories: Array<ID>;
}
