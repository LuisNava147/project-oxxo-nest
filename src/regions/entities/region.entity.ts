import {Entity, Column, PrimaryGeneratedColumn }from "typeorm";
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
}
