import { Module } from '@nestjs/common';
import { GraphQLGatewayModule } from '@nestjs/graphql';

@Module({
  imports: [GraphQLGatewayModule.forRoot({
    server: {
      cors: true
    },
    gateway: {
      serviceList: [
        { name: "employees", url: "http://localhost:3000/graphql" },
        { name: "projects", url: "http://localhost:3001/graphql" },
        { name: "locations", url: "http://localhost:3002/graphql" },
      ]
    }
  })],
  controllers: [],
  providers: [],
})
export class AppModule { }
