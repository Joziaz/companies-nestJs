import { Module } from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CompaniesResolver } from "./companies.resolver";
import { MemoryRepository } from "./infrastructure/memoryRepository";
import { Company } from "./domain/entities/company.entity";

@Module({
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
