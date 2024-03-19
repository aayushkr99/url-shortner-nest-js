import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private prisma: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret'
        })
    }

    async validate(payload: {
        id: number,
        email: string
    }){
        const user = await this.prisma.user.findUnique({
            where:{
                id: payload.id
            },
        });
        
        if(!user) throw new Error('Invalid token');
        delete user.password
        console.log("req user -=-=-=-=-=-", user)
        return user;
    }

}