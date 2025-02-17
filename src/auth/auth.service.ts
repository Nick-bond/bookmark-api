import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'; 
import { AuthDTO } from "./dto";
import * as argon from 'argon2';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService
    ) {}
    async signup(dto: AuthDTO) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
            })
            return this.signToken(user.id, user.email);
        } catch (error) {
            if(error.code === 'P2002') {
                throw new ForbiddenException('Credentials taken');
            }
            throw new Error(error);
        } 
    }

    async signin(dto: AuthDTO) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        if(!user) {
            throw new ForbiddenException('Credentials incorrect')
        }

        const pwMatches = await argon.verify(user.hash, dto.password);

        if(!pwMatches) {
            throw new ForbiddenException('Credentials incorrect')
        }
        
        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string) {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret,
        });

        return {
            access_token: token
        }
    }
}