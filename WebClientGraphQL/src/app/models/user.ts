import { Role } from "./role";

export interface User {
    id: number;
    name: string;
    roles: Role[];
}