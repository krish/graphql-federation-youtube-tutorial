import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Info,
  CONTEXT,
} from '@nestjs/graphql';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { EmployeeService } from './employee.service';
import { Employee } from './entity/employee.entity';
import { Project } from './entity/project.entity';
import { Location } from './entity/location.entity';
import { Inject } from '@nestjs/common';
@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(
    private employeeService: EmployeeService,
    @Inject(CONTEXT) private ctx,
  ) {}

  @Query(() => [Employee], { name: 'getAllEmployees' })
  findAll() {
    return this.employeeService.findAll();
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  create(@Args('employeeInput') employee: EmployeeCreateDTO) {
    return this.employeeService.create(employee);
  }
  @Query(() => Employee, { name: 'findEmployee' })
  findOne(@Args('id') id: string, @Info() info) {
    //if you want to fetch (from db) ONLY the query fields what use asked use @info
    const keys = info.fieldNodes[0].selectionSet.selections
      .filter((selection) => !selection.selectionSet)
      .map((item) => item.name.value);

    console.log('Query fields are =====>', keys);
    //todo: now you can pass keys to typeORM

    return this.employeeService.findOne(id);
  }

  @ResolveField((of) => Project)
  project(@Parent() employee: Employee) {
    return { __typename: 'Project', id: employee.projectId };
  }

  @ResolveField((of) => Location)
  location(@Parent() employee: Employee) {
    this.ctx.krish = { name: 'krishantha' };
    console.log('location field resolved');
    return { __typename: 'Location', id: employee.locationId, fields: 'dddd' };
  }

  /* @ResolveField(() => Project)
    project(@Parent() employee: Employee) {
        return this.employeeService.getProject(employee.projectId)

    } */
}
