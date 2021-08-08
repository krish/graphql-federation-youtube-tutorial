import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Project } from './project.entity';
import { Location } from './location.entity';

@ObjectType()
@Directive('@key(fields: "id")')
@Entity('public.Employee')
export class Employee {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column()
  firstName: string;
  @Field()
  @Column()
  lastName: string;
  @Field()
  @Column()
  designation: string;
  @Field({ nullable: true })
  @Column({ nullable: true })
  city: string;

  /*  @ManyToOne(() => Project, project => project.employees) */
  @Field(() => Project)
  project: Project;

  @Field((type) => Location)
  location: Location;

  @Column()
  @Field()
  projectId: string;

  @Column()
  @Field()
  locationId: string;
}
