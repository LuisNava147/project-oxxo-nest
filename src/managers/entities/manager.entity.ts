import {Entity, Column, PrimaryGeneratedColumn }from "typeorm";
import { OneToOne } from "typeorm";
import { Location } from "src/locations/entities/location.entity";
import { JoinColumn } from "typeorm";
import { User } from "src/auth/entities/user.entity";
@Entity()

export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: string;
    @Column('text')
    managerFullName: string;
    @Column('float')
    managerSalary: number;
    @Column('text',{
        unique:true
    })
    managerEmail: string;
    @Column('text')
    managerPhoneNumber: string;
    //Relacion con location 
    @OneToOne(()=> Location,{nullable:true})
     @JoinColumn({
        name:"locationId"
     })
    location: Location | string | null;
    @OneToOne(()=>User)
    @JoinColumn({
        name:"userId"
    })
    user:User;
}
