export interface ILoginResponse {
    token : string;
    accessToken : string;
    refreshToken : string;
    user : {
        isPasswordNeedChange : boolean;
        email : string;
        name : string;
        role : string;
        image: string;
        status : string;
        isDeleted : boolean;
        emailVerified : boolean;
    }
}