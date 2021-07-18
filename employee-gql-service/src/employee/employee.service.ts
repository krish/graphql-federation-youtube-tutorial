import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import { Employee } from './entity/employee.entity';

@Injectable()
export class EmployeeService {

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>) {

    }

    async findAll(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }
    async findOne(id: string) {
        return this.employeeRepository.findOne(id)
    }

    async create(employee: EmployeeCreateDTO): Promise<Employee> {

        let emp = this.employeeRepository.create(employee);
        return this.employeeRepository.save(emp)

    }

    async forProject(id: string) {
        return await this.employeeRepository.find({ "projectId": id })
    }
    async forLocation(id: string) {
        return await this.employeeRepository.find({ "locationId": id })
    }
}
