import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { Location } from './entity/location.entity';
@Injectable()
export class LocationService {
    constructor(@InjectRepository(Location) private locatinRepository: Repository<Location>) { }

    create(project: CreateLocationInput): Promise<Location> {
        let proj = this.locatinRepository.create(project);
        return this.locatinRepository.save(proj) //you can directly use this without create. depends on DTO. this explained in video

    }

    async findAll(): Promise<Location[]> {
        return this.locatinRepository.find();
    }

    async findOne(id: string): Promise<Location> {
        return await this.locatinRepository.findOne(id);
    }

    update(id: string, updateProjectInput: UpdateLocationInput) {
        let project: Location = this.locatinRepository.create(updateProjectInput)
        project.id = id;
        return this.locatinRepository.save(project)
    }

    async remove(id: string) {
        let proj = this.findOne(id)
        if (proj) {
            let ret = await this.locatinRepository.delete(id)
            if (ret.affected === 1) {
                return proj;
            }
        }
        throw new NotFoundException(`Record cannot find by id ${id}`)
    }
}
