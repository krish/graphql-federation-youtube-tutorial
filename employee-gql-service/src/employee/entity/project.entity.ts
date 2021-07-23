import { Directive, Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Employee } from "./employee.entity";

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
//@Directive('@key(fields: ["id","code"])')
@Directive('@key(fields: "code")')
export class Project {

    @Field((type) => ID)
    @Directive('@external')
    id: string

    @Field(() => Int)
    @Directive('@external')
    code: number

    @Field((type) => [Employee])
    employees: Employee[]

}