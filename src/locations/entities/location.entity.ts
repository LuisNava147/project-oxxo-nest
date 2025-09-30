import { Manager } from "src/managers/entities/manager.entity";
import {Entity, Column, PrimaryGeneratedColumn }from "typeorm";
import { OneToOne, JoinColumn } from "typeorm";
import { ManyToOne } from "typeorm";
import { ManyToMany } from "typeorm/";
import { Region } from "src/regions/entities/region.entity";
import { OneToMany } from "typeorm";
import { Employee } from "src/employees/entities/employee.entity";
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        default:"OXXO Juriquilla"
    })
    @Column('text')
    locationName: string;

    @ApiProperty({
        default:"Avenida Tal, S/N, 7220"
    })
    @Column('text')
    locationAddress: string;

    @ApiProperty({
        default:[12,12]
    })
    @Column('double precision',{array:true, nullable: true})
    locationLatLng: number[];


    @OneToOne(()=>Manager, {
        eager:true,
    })
    @JoinColumn({
        name: "managerId"
    })
    manager: Manager;
//relacion bd
    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: "regionId"
    })
    region: Region;
    @OneToMany(()=>Employee,(employee)=>employee.location)
    employee: Employee[];

}
