import { Inject, Injectable } from "@nestjs/common";
import { CreateCompanyInput } from "./domain/dtos/createCompany.input";
import { Repository } from "./domain/repository";
import { Company } from "./domain/entities/company.entity";
import { UpdateCompanyInput } from "./domain/dtos/updateCompany.input";

@Injectable()
export class CompaniesService {
	private readonly repository: Repository<Company>;

	constructor(
		@Inject("Repository<Company>")
		companyRepository: Repository<Company>,
	) {
		this.repository = companyRepository;
	}

	GetAll(): Company[] {
		return this.repository.GetAll();
	}

	GetById(id: number): Company {
		return this.repository.GetById(id);
	}

	Create(request: CreateCompanyInput) {
		const newCompany = new Company(
			request.Name,
			request.Address,
			request.Phone,
			request.Email,
		);
		return this.repository.Save(newCompany);
	}

	UpdateCompany(request: UpdateCompanyInput) {
		const updatedCompany = new Company(
			request.Name,
			request.Address,
			request.Phone,
			request.Email,
		);
		updatedCompany.Id = updatedCompany.Id;
		this.repository.Update(updatedCompany);
	}

	Delete(id: number): void {
		this.repository.Delete(id);
	}
}
