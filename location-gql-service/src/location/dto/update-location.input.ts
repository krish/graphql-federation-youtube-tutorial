import { CreateLocationInput } from './create-location.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLocationInput {

  @Field()
  id: string
  @Field()
  name: string
  @Field(() => Int)
  code: number


}