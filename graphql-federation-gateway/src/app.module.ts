import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { compareStrings } from '@graphql-tools/utils';
import { Module } from '@nestjs/common';
import {
  GATEWAY_BUILD_SERVICE,
  GraphQLGatewayModule,
  ObjectType,
} from '@nestjs/graphql';
import { graphQlQueryToJson } from 'graphql-query-to-json';

class SharedDataProvider extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    if (context.query) {
      let queryJson;

      if (context.variables) {
        let variables = {};
        Object.keys(context.variables).map(
          (k) => (variables[k] = context.variables[k]),
        );
        queryJson = graphQlQueryToJson(context.query, {
          variables,
        });
      } else {
        queryJson = graphQlQueryToJson(context.query);
      }

      let args = {};

      Object.keys(queryJson.query).forEach((key) => {
        args[key] = queryJson.query[key].__args;
      });
      if (request.variables && request.variables.representations) {
        request.variables.representations.map((e) => {
          e.__args = args;
        });
      }
    }
  }
}
@Module({
  providers: [
    {
      provide: SharedDataProvider,
      useValue: SharedDataProvider,
    },
    {
      provide: GATEWAY_BUILD_SERVICE,
      useFactory: (SharedDataProvider) => {
        return ({ name, url }) => new SharedDataProvider({ url });
      },
      inject: [SharedDataProvider],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
class BuildServiceModule {}

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        gateway: {
          serviceList: [
            { name: 'employees', url: 'http://localhost:3000/graphql' },
            { name: 'projects', url: 'http://localhost:3001/graphql' },
            { name: 'locations', url: 'http://localhost:3002/graphql' },
          ],
        },
        server: {
          cors: true,
          context: ({ req }) => ({
            query: req.body.query,
            variables: req.body.variables,
          }),
        },
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
})
export class AppModule {}
