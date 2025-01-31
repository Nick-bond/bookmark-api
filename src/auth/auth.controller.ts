import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from './dto';

@Controller('auth')

export class AuthControler {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signup(@Body() dto: AuthDTO ) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: AuthDTO) {
        return this.authService.signin(dto)
    }
}