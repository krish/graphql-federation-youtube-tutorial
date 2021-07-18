import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Location } from "./entity/location.entity";
import { EmployeeService } from "./employee.service";
import { Employee } from "./entity/employee.entity";

@Resolver((of) => Location)
export class LocationResolver {


    constructor(private readonly employeeService: EmployeeService) { }

    @ResolveField((of) => [Employee])
    employees(@Parent() location: Location): Promise<Employee[]> {
        return this.employeeService.forLocation(location.id);
    }


}