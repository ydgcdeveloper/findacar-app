export interface RateOption {
    id: ID;
    description: string;
    value: number;
    quality: RateOptionQuality;
}

export interface Rate {
    id: ID;
    orderId: ID;
    rate: number;
    rateOptions: ID [];
}

export type ID  = string | number;

export enum RateOptionQuality {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    EXCELENTE = 'EXCELENTE',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MUY_BIEN = 'MUY_BIEN',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    REGULAR = 'REGULAR',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MAL = 'MAL',
}
