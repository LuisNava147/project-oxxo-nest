import {Entity, Column, PrimaryGeneratedColumn }from "typeorm";
import { OneToMany } from "typeorm";
import { Location } from "src/locations/entities/location.entity";
@Entity()
export class Region {
    @PrimaryGeneratedColumn('increment')
    regionId: number;
    @Column({
        type:"text",
        unique: true,
    })
    regionName: string;
    @Column('double precision',{array:true,nullable: true})
    regionStates: string[];
    @OneToMany(()=>Location, (location => location.region))
    locations: Location[];
}
