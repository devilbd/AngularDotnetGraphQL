import { Role } from "./role";

export interface User {
    id: number;
    name: string;
    emailAddress: string;
    roles: Role[];
}