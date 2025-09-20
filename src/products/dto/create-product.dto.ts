import { IsUUID, IsOptional,
    IsString,
    MaxLength,
    IsNumber,
    IsInt } from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from "src/providers/entities/provider.entity";

export class CreateProductDto extends Product {
    @IsUUID("4")
    @IsOptional()
    declare productId: string;//declare para que herede 
    @IsString()
    @MaxLength(40)
    declare productName: string;
    @IsNumber()
    declare price: number;
    @IsInt()
    declare countSeal: number;
    @IsString()
    @IsUUID("4")
   declare provider: Provider;
}
