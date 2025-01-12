import { Module } from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CompaniesResolver } from "./companies.resolver";
import { Company, CompanySchema } from "./domain/entities/company.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoDbRepository } from "./infrastructure/mongoDbRepostiory";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Company.name,
				schema: CompanySchema,
			},
		]),
	],
	providers: [
		CompaniesService,
		CompaniesResolver,
		{
			provide: "Repository<Company>",
			useClass: MongoDbRepository<Company>,
		},
	],
})
export class CompaniesModule {}
