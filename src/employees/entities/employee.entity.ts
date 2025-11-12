import {Entity, Column, PrimaryGeneratedColumn }from "typeorm";
import { ManyToOne } from "typeorm";
import { Location } from "src/locations/entities/location.entity";
import { JoinColumn } from "typeorm";
import { OneToOne } from "typeorm";
import { User } from "src/auth/entities/user.entity";
@Entity()
export class Employee {
    @PrimaryGeneratedColumn("uuid")
    employeeId: string;
    @Column({type:"text"})
    employeeName: string;
    @Column({type:"text"})
    employeeLastname: string;
    @Column('text')
    employeePhoneNumber: string;
    @Column('text',{
        unique:true
    })
    employeeEmail: string;
    @Column({type:"text",nullable:true})
    employeePhoto?: string;
//relacion en BD 
    @ManyToOne(()=>Location,(location)=>location.employee)
    @JoinColumn({
        name:"locationId"
    })
    location: Location | string;
    @OneToOne(()=>User)
    @JoinColumn({
        name: "userId"
    })
    user:User;
}

