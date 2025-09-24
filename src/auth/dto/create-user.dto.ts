import { IsString,MaxLength,IsEmail,IsOptional,MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto extends User {
    @IsString()
    @IsEmail()
    userEmail: string;
    @IsString()
    @MinLength(8)
    userPassword: string;
}
