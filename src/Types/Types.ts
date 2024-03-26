export interface Movies{
    id:number,
    name:string,
    release_date:number,
    explanation:string,
    language:string,
    base64Image:string,
    category:{
        id:number,
        name:string
    }
}
export interface Categories{
    id:number,
    name:string
}
export interface User{
    id:number,
    email:string,
    username:string,
    password:string,
    base64image:string
    accountNonExpired:boolean,
    accountNonLocked:boolean,
    account_active:boolean,
    authorities:{
        authority:string
    },
    credentialsNonExpired:boolean,
    enabled:boolean,
    role:{
        id:number,
        name:string
    }

}
export interface Categories{
    id:number,
    name:string
}

export interface Comments{
    id:number,
    movieId:number,
    userId:number,
    userName:string,
    comment:string,
    rating:number,
    time:string
}