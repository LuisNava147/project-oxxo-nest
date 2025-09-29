import { IsString,MaxLength,IsEmail,IsOptional,IsObject } from "class-validator";
import { Employee } from "../entities/employee.entity";
import { Location } from "src/locations/entities/location.entity";

export class CreateEmployeeDto extends Employee {
    @IsString() 
    @MaxLength(80)
    employeeName: string;
    @IsString()
    @MaxLength(70)
    employeeLastname: string;
    @IsString()
    @IsEmail()
    employeeEmail: string;
    @IsString()
    @MaxLength(16)
    employeePhoneNumber: string;   
    @IsObject()
    @IsOptional()
    location: Location;

}
