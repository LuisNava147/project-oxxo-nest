import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("singup")
  singUp(@Body()createUserDto:CreateUserDto){
   return this.authService.registerUser(createUserDto)
  }

  @Post("/login")
  login(@Body()loginUserDto: LoginUserDto){
    return this.authService.loginUser(loginUserDto)
  }



}