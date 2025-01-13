import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CompaniesService } from "./services/companies.service";
import { CreateCompanyInput } from "./domain/dtos/createCompany.input";
import { Company } from "./domain/entities/company.entity";
import { UpdateCompanyInput } from "./domain/dtos/updateCompany.input";
import { ObjectId } from "mongoose";

@Resolver()
export class CompaniesResolver {
	constructor(private readonly companiesService: CompaniesService) {}
	@Query(() => [Company])
	Companies(): Promise<Company[]> {
		return this.companiesService.GetAll();
	}

	@Query(() => Company, { nullable: true })
	CompanyById(
		@Args("id", { type: () => String })
		id: ObjectId,
	): Promise<Company> {
		return this.companiesService.GetById(id);
	}
	@Mutation(() => Company)
	CreateCompany(
		@Args("createCompanyInput") input: CreateCompanyInput,
	): Promise<Company> {
		return this.companiesService.Create(input);
	}

	@Mutation(() => Company)
	UpdateCompany(
		@Args("updateCompanyInput") input: UpdateCompanyInput,
	): Promise<Company> {
		return this.companiesService.UpdateCompany(input);
	}

	@Mutation(() => Boolean)
	DeleteCompany(
		@Args("id", { type: () => String }) id: ObjectId,
	): Promise<boolean> {
		return this.companiesService.Delete(id);
	}
}
