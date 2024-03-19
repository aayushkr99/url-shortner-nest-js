import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, RegisterDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwt: JwtService){}

    async login (dto: AuthDto) {
        try{
            const findEmail = await  this.prisma.user.findUnique({where:{email : dto.email}})
            
            if(!findEmail) throw new ForbiddenException ("User not found")

           const validPassword = await argon.verify(findEmail.password , dto.password)

           if (!validPassword) throw new ForbiddenException("Invalid Password");

           delete findEmail.password
           const token = await this.jwt.signAsync({id : findEmail.id, email : findEmail.email} , {
               secret: process.env.JWT_SECRET,
               expiresIn: '15m'
           })
           return {...findEmail ,token}

        }catch(err){
            throw err
        }
    }


    async signup (dto: RegisterDto) {
        try{
            const hash = await argon.hash(dto.password)
            const user  = await this.prisma.user.create({
                data:{
                    username: dto.username,
                    email: dto.email,
                    password: hash ,
                },
                select:  {
                    id : true,
                    username :true,
                    email : true    
                }
            })
            return {message : "HI am sign UP"}
        }catch(err){
            if(err instanceof PrismaClientKnownRequestError){
                throw err
            }

        }

    }
}