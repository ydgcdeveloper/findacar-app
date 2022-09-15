export interface Address {
    id: number;
    name: string;
    details: string;
    locationData: {
        name: string;
        latitude: number;
        longitude: number;
    };
    selected: boolean
}
