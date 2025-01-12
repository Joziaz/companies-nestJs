import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { CompaniesModule } from "./companies/companies.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { GraphQLFormattedError } from "graphql/error";

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), "src/shema.gpl"),
			formatError: (error) => {
				const originalError = error.extensions
					.originalError as GraphQLFormattedError;

				if (!originalError) {
					return {
						message: error.message,
						code: error.extensions?.code,
					};
				}
				return {
					message: originalError.message,
					code: error.extensions?.code,
				};
			},
		}),
		CompaniesModule,
	],
	controllers: [],
	providers: [AppService],
})
export class AppModule {}
