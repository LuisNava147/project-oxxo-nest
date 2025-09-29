import { IsString,MaxLength,IsEmail,IsOptional, IsArray, ArrayNotEmpty,IsObject} from "class-validator";
import { Location } from "../entities/location.entity";
import { Region } from "src/regions/entities/region.entity";

export class CreateLocationDto extends Location {
@IsString() 
@MaxLength(35)
locationName: string;
@IsString()
@MaxLength(130)
locationAddress: string;
@IsArray()
@ArrayNotEmpty()
locationLatLng: number[];
@IsObject()
@IsOptional()
region: Region;
}
