import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveReference,
  CONTEXT,
  Context,
} from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Location } from './entity/location.entity';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';
import { Inject } from '@nestjs/common';
import { query } from 'express';
@Resolver((of) => Location)
export class LocationResolver {
  constructor(
    private readonly locationService: LocationService,
    @Inject(CONTEXT) private ctx,
  ) {}

  @Mutation(() => Location)
  createLocation(@Args('location') location: CreateLocationInput) {
    return this.locationService.create(location);
  }

  @Query(() => [Location], { name: 'getAllLocations' })
  findAll() {
    return this.locationService.findAll();
  }

  @Query(() => Location, { name: 'location' })
  findOne(@Args('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Mutation(() => Location)
  updateLocation(@Args('location') location: UpdateLocationInput) {
    return this.locationService.update(location.id, location);
  }

  @Mutation(() => Location)
  removeLocation(@Args('id') id: string) {
    return this.locationService.remove(id);
  }

  @ResolveReference()
  resolvereferance(ref: { __typename: string; id: string; __args: any }) {
    console.log(ref.__args);
    return this.locationService.findOne(ref.id);
  }
}
