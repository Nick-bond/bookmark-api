import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from '@nestjs/jwt'
import { AuthControler } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy";

@Module({
    imports: [JwtModule.register({})],
    controllers: [AuthControler],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {};