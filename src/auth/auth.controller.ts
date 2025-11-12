import { Controller, Get, Post, Body, Patch, Param, Delete,Put, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Response } from 'express';
import { Res } from '@nestjs/common';
import { TOKEN_NAME } from './constants/jwt.constants';
import { Cookies } from './decorators/cookies.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register/employee/:id")
  registerEmployee(@Body()createUserDto:CreateUserDto, @Param("id") id:string){
    if(createUserDto.userRoles.includes("Admin") || 
    createUserDto.userRoles.includes("Manager")) throw new BadRequestException("Rol invalido")
   return this.authService.registerEmployee(id, createUserDto)
  }

  @Post("register/manager/:id")
  registerManager(@Body()createUserDto:CreateUserDto, @Param("id") id:string){
    if(createUserDto.userRoles.includes("Admin") || 
    createUserDto.userRoles.includes("Manager")) throw new BadRequestException("Rol invalido")
   return this.authService.registerManager(id, createUserDto)
  }

  @Post("login")
  async login(@Body()loginUserDto: LoginUserDto, @Res({passthrough:true})  response: Response, @Cookies() cookies:any){
    const token= await this.authService.loginUser(loginUserDto)
    let expireDate = new Date()
    expireDate.setDate(expireDate.getDay()+7)
    response.cookie(TOKEN_NAME, token,{
      httpOnly: true,
      secure: true,
      sameSite:'none',
      expires: expireDate,
      maxAge: 1000 * 60 * 60 *24 *7
    });
    return;
  }

  @Patch("/:email")
  updateUser(@Param('email') userEmail:string,@Body()updateUserDto:UpdateUserDto){
    return this.authService.updateUser(userEmail,updateUserDto)
  }


}