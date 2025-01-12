import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CompaniesService } from "./companies.service";
import { CreateCompanyInput } from "./domain/dtos/createCompany.input";
import { Company } from "./domain/entities/company.entity";
import { UpdateCompanyInput } from "./domain/dtos/updateCompany.input";

@Resolver()
export class CompaniesResolver {
	constructor(private readonly companiesService: CompaniesService) { }
	@Query(() => [Company])
	Companies(): Company[] {
		return this.companiesService.GetAll();
	}

	@Query(() => Company)
	Company(@Args("id") id: number): Company {
		return this.companiesService.GetById(id);
	}
	@Mutation(() => Company)
	CreateCompany(
		@Args("createCompanyInput") input: CreateCompanyInput,
	): Company {
		return this.companiesService.Create(input);
	}

	@Mutation(() => Company, { nullable: true })
	UpdateCompany(@Args("updateCompanyInput") input: UpdateCompanyInput): void {
		this.companiesService.UpdateCompany(input);
	}

	@Mutation(() => Company, { nullable: true })
	DeleteCompany(@Args("id") id: number): void {
		this.companiesService.Delete(id);
	}
}
