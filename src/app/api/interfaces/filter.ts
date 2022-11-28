import { ID } from './rate.interface';

export interface Filter {
    sortBy: SortByTypes;
    onlyAvailable: boolean;
    priceRange: {
        lower: number;
        upper: number;
    };
    categories: Array<ID>;
}

export enum SortByTypes {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CLOSENESS = 'closeness',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    RATING = 'rating',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ARRIVAL_TIME = 'arrival_time',
}
