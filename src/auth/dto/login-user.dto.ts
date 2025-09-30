import { IsString,MaxLength,IsEmail,IsOptional,MinLength } from "class-validator";
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class LoginUserDto{
@ApiProperty({
    default:"user@gmail.com"
})
@IsString()
@IsEmail()
userEmail: string;

@ApiProperty({
    default:"12345Q54321"
})
@IsString()
@MinLength(8)
userPassword: string;
}