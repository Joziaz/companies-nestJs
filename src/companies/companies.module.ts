import { Module } from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CompaniesResolver } from "./companies.resolver";
import { MemoryRepository } from "./infrastructure/memoryRepository";
import { Company, CompanySchema } from "./domain/entities/company.entity";
import { MongooseModule } from "@nestjs/mongoose";

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
			useValue: new MemoryRepository<Company>(),
		},
	],
})
export class CompaniesModule {}
