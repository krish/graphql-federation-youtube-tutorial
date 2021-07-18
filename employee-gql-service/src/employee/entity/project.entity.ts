import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Employee } from "./employee.entity";

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Project {

    @Field((type) => ID)
    @Directive('@external')
    id: string

    @Field((type) => [Employee])
    employees: Employee[]

}