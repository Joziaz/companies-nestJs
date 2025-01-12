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

	GetAll(): Promise<Company[]> {
		return this.repository.GetAll();
	}

	GetById(id: string): Promise<Company> {
		return this.repository.GetById(id);
	}

	Create(request: CreateCompanyInput): Promise<Company> {
		const newCompany = new Company(
			request.Name,
			request.Address,
			request.Phone,
			request.Email,
		);
		return this.repository.Save(newCompany);
	}

	async UpdateCompany(request: UpdateCompanyInput): Promise<Company> {
		const updatedCompany = new Company(
			request.Name,
			request.Address,
			request.Phone,
			request.Email,
		);
		updatedCompany._id = request.Id;
		await this.repository.Update(updatedCompany);
		return Promise.resolve(updatedCompany);
	}

	Delete(id: string): Promise<boolean> {
		return this.repository.Delete(id);
	}
}
