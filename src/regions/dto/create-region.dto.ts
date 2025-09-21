import { IsString,MaxLength,IsEmail,IsOptional, IsArray, ArrayNotEmpty} from "class-validator";
import { Region } from "../entities/region.entity";

export class CreateRegionDto extends Region {
@IsString()
@MaxLength(100)
regionName: string;
@IsArray()
regionStates: string[];

}
