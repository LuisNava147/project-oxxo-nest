import { Manager } from "src/managers/entities/manager.entity";
import {Entity, Column, PrimaryGeneratedColumn }from "typeorm";
import { OneToOne, JoinColumn } from "typeorm";
import { ManyToOne } from "typeorm";
import { ManyToMany } from "typeorm/";
import { Region } from "src/regions/entities/region.entity";
import { OneToMany } from "typeorm";
import { Employee } from "src/employees/entities/employee.entity";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;
    @Column('text')
    locationName: string;
    @Column('text')
    locationAddress: string;
    @Column('double precision',{array:true, nullable: true})
    locationLatLng: number[];
    @OneToOne(()=>Manager)
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
