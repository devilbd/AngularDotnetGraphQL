import { User } from "../../../models/user";

export interface IdentityManagerPageVM {
    users: User[];
    userForDelete?: User;
}