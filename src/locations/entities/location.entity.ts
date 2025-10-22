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

    @ApiProperty({default: "e52c7b77-aec9-4a6f-b031-ddb3eed5d9fb"})
    @OneToOne(()=>Manager, {
        eager:true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({
        name: "managerId"
    })
    manager: Manager | string;
//relacion bd
    @ManyToOne(() => Region, (region) => region.locations)
    @JoinColumn({
        name: "regionId"
    })
    region: Region;
    @OneToMany(()=>Employee,(employee)=>employee.location)
    employee: Employee[];

}
