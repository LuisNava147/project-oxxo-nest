import { Product } from "src/products/entities/product.entity";
import {Entity, Column, OneToMany, PrimaryGeneratedColumn }from "typeorm";
@Entity()
export class Provider {
    @PrimaryGeneratedColumn("uuid")
    providerId: string;
    @Column({type:"text"})
    providerName: string;
    @Column({type:"text"})
    providerEmail: string;
    @Column({
        type:"text",
        nullable: true,
    })
    providerPhoneNumber: string;
    
    @OneToMany(() => Product, (product) => product.provider)
    products: Product[]
}
