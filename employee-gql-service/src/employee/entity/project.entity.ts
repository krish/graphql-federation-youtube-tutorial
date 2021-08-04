import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Employee } from './employee.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id, code")')
export class Project {
  @Field((type) => ID)
  @Directive('@external')
  id: string;

  @Field(() => Int, { nullable: true })
  @Directive('@external')
  code: number;

  @Field((type) => [Employee])
  employees: Employee[];
}
