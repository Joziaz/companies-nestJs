import { Module } from "@nestjs/common";
import { CompaniesModule } from "./companies/companies.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { GraphQLFormattedError } from "graphql/error";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [".env", ".development.env"],
			isGlobal: true,
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				uri: config.get<string>("MONGO_CONNECTION_STRING"),
			}),
		}),
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
	providers: [],
})
export class AppModule {}
