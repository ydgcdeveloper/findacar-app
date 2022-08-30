export interface RateOption {
    id: number;
    description: string;
    value: number;
    quality: RateOptionQuality;
}

export enum RateOptionQuality {
    EXCELENTE = 'EXCELENTE',
    MUY_BIEN = 'MUY_BIEN',
    REGULAR = 'REGULAR',
    MAL = 'MAL',
}
