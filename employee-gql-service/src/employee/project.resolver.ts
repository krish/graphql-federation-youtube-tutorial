import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { EmployeeService } from "./employee.service";
import { Employee } from "./entity/employee.entity";
import { Project } from "./entity/project.entity";

@Resolver((of) => Project)
export class ProjectResolver {

    constructor(private readonly employeeService: EmployeeService) { }

    @ResolveField((of) => [Employee])
    employees(@Parent() project: Project): Promise<Employee[]> {
        console.log('resolving employees', project.id)
        return this.employeeService.forProject(project.id);
    }




}