import { IsString,MaxLength,IsEmail,IsOptional,MinLength,IsIn } from "class-validator";
import { User } from "../entities/user.entity";
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class CreateUserDto extends User {
    @ApiProperty({
        default:"user@gmail.com"
    })
    @IsEmail()
    userEmail: string;
    
    @ApiProperty({
        default:"12345Q54321"
    })
    @IsString()
    @MinLength(8)
    userPassword: string;

    @ApiProperty({
        default:"Employee"
    })
    @IsOptional()
    @IsIn(["Admin","Employee","Manager"])
    userRoles: string[];
}
