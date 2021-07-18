import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput {


  @Field()
  name: string
  @Field(() => Int)
  code: number
}