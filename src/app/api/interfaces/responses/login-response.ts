import { User } from './../user.interface';

export interface LoginResponse {
    accessToken: String;
    user: User;
}
