export interface RateOption {
    id: ID;
    description: string;
    value: number;
    quality: RateOptionQuality;
}

export interface Rate {
    id: ID,
    orderId: ID,
    rate: number,
    rateOptions: ID [],
}

export type ID  = string | number

export enum RateOptionQuality {
    EXCELENTE = 'EXCELENTE',
    MUY_BIEN = 'MUY_BIEN',
    REGULAR = 'REGULAR',
    MAL = 'MAL',
}
