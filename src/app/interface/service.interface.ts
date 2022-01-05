export interface Service {
    name: string
    status: ServiceStatus
    address: string
    schedule: string
    rate: number
    photo: string
    pickupTime: string    
}

export enum ServiceStatus {
    DISPONIBLE = 'DISPONIBLE',
    NO_DISPONIBLE = 'NO_DISPONIBLE',
}
