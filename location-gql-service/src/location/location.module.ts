import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationResolver } from './location.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entity/location.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationService, LocationResolver]
})
export class LocationModule { }
