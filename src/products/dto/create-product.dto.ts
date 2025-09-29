import { IsUUID, IsOptional,
    IsString,
    MaxLength,
    IsNumber,
    IsInt, IsObject} from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from "src/providers/entities/provider.entity";

export class CreateProductDto extends Product {
    @IsUUID("4")
    @IsOptional()
    productId: string;//declare para que herede 
    @IsString()
    @MaxLength(40)
    productName: string;
    @IsNumber()
    price: number;
    @IsInt()
    countSeal: number;
    @IsObject()
    
    provider: Provider;
}
