import { IsEmail, IsString,IsNotEmpty, IsNumber } from "class-validator";


export class UrlDto {

    @IsNotEmpty()
    originalUrl: string;
    
    @IsString()
    ip: string;

    @IsString()
    os: string;

    @IsString()
    browser: string;

    @IsString()
    country: string;

    @IsString()
    city: string;

    @IsString()
    referrer: string;
}

export class UserId {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}