import { Injectable } from "@nestjs/common";
import { CreateCompanyInput } from "../domain/dtos/createCompany.input";
import { Company } from "../domain/entities/company.entity";
import { UpdateCompanyInput } from "../domain/dtos/updateCompany.input";
import { Model, ObjectId } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CompaniesService {
	private readonly companyModel: Model<Company>;

	constructor(
		@InjectModel(Company.name)
		companyRepository: Model<Company>,
	) {
		this.companyModel = companyRepository;
	}

	GetAll(): Promise<Company[]> {
		return this.companyModel.find();
	}

	GetById(id: ObjectId): Promise<Company> {
		return this.companyModel.findById(id);
	}

	Create(request: CreateCompanyInput): Promise<Company> {
		const newCompany = new this.companyModel({
			Name: request.Name,
			Address: request.Address,
			Phone: request.Phone,
			Email: request.Email,
		});
		return newCompany.save();
	}

	async UpdateCompany(request: UpdateCompanyInput): Promise<Company> {
		const updatedCompany = new this.companyModel({
			_id: request.Id,
			Name: request.Name,
			Address: request.Address,
			Phone: request.Phone,
			Email: request.Email,
		});
		await updatedCompany.updateOne();
		return Promise.resolve(updatedCompany);
	}

	async Delete(id: ObjectId): Promise<boolean> {
		const result = await this.companyModel.deleteOne({ _id: id });
		if (result.deletedCount === 0) {
			throw new Error(`client with id: ${id} does not exist`);
		}
		return true;
	}
}
