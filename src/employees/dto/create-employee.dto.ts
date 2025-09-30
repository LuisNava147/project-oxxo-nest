import { IsString,MaxLength,IsEmail,IsOptional,IsObject } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';


export class CreateEmployeeDto extends Employee {
    @ApiProperty()
    @IsString() 
    @MaxLength(80)
    employeeName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(70)
    employeeLastname: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    employeeEmail: string;

    @ApiProperty()
    @IsString()
    @MaxLength(16)
    employeePhoneNumber: string;   

    @ApiPropertyOptional()
    @IsObject()
    @IsOptional()
    location: Location;

}

