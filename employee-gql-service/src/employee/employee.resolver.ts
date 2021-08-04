import { Info } from '@nestjs/graphql';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';
import { Project } from './entity/project.entity';
import { Location } from './entity/location.entity';
import { UsingJoinColumnIsNotAllowedError } from 'typeorm';
@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeeService) {}

  @Query(() => [Employee], { name: 'getAllEmployees' })
  findAll(@Info() info) {
    console.log('inside fina all');
    const keys = info.fieldNodes[0].selectionSet.selections.map(
      (item) => item.name.value,
    );
    //console.log(info.fieldNodes[0].selectionSet.selections);

    return this.employeeService.findAll();
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  create(@Args('employeeInput') employee: EmployeeCreateDTO) {
    return this.employeeService.create(employee);
  }
  @Query(() => Employee, { name: 'findEmployee' })
  findOne(@Args('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @ResolveField((of) => Project)
  project(@Parent() employee: Employee) {
    return { __typename: 'Project', id: employee.projectId, code: 8191 };
  }

  @ResolveField((of) => Location)
  location(@Parent() employee: Employee) {
    return { __typename: 'Location', id: employee.locationId };
  }

  /* @ResolveField(() => Project)
    project(@Parent() employee: Employee) {
        return this.employeeService.getProject(employee.projectId)

    } */
}
