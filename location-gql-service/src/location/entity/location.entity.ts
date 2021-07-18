import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Directive('@key(fields: "id")')
@Entity()
export class Location {

    @Field((type) => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Field()
    @Column()
    name: string
    @Field(() => Int)
    @Column()
    code: number

    /*  @OneToMany(() => Employee, employee => employee.project)
     @Field(() => [Employee], { nullable: true })
     employees: Employee[] */

}