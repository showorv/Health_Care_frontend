import { UserRole } from "../lib/AuthUtils";


export interface UserInfo {
    id : string;
    name : string,
    email : string,
    role : UserRole
}