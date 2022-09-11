export interface Filter {
    sortBy: SortByTypes,
    onlyAvailable: boolean,
    priceRange: {
        lower: number,
        upper: number,
    },
    categories: string[]
}

export enum SortByTypes {
    CLOSENESS = 'closeness',
    RATING = 'rating',
    ARRIVAL_TIME = 'arrival_time',
}
