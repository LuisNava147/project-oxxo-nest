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
    name: string;
    @Column({type:"text"})
    lastname: string;
    @Column({type:"text"})
    phoneNumber: string;
    @Column({type:"text"})
    email: string;
    @Column({type:"text",nullable:true})
    photoUrl: string;
//relacion en BD 
    @ManyToOne(()=>Location,(location)=>location.employee)
    @JoinColumn({
        name:"locationId"
    })
    location: Location;
    @OneToOne(()=>User)
    @JoinColumn({
        name: "userId"
    })
    user:User;
}

