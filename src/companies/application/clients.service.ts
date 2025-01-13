import { Injectable } from "@nestjs/common";
import { Company } from "../domain/entities/company.entity";
import { Client } from "../domain/entities/client.entity";
import { CreateClientInput } from "../domain/dtos/createClient.input";
import { UpdateClientInput } from "../domain/dtos/updateClientInput";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";

@Injectable()
export class ClientService {
	private readonly clientModel: Model<Client>;
	private readonly companyModel: Model<Company>;

	constructor(
		@InjectModel(Client.name)
		clientModel: Model<Client>,
		@InjectModel(Company.name)
		companyModel: Model<Company>,
	) {
		this.clientModel = clientModel;
		this.companyModel = companyModel;
	}

	GetByCompanyId(id: ObjectId): Promise<Client[]> {
		return this.clientModel.find({ Company: id });
	}
	GetAll(): Promise<Client[]> {
		return this.clientModel.find();
	}

	GetById(id: ObjectId): Promise<Client> {
		return this.clientModel.findById(id);
	}

	async Create(request: CreateClientInput): Promise<Client> {
		const company = await this.companyModel.findById(request.CompanyId);
		if (!company) {
			throw new Error(
				`company with id: ${request.CompanyId} does not exist`,
			);
		}

		const newClient = new this.clientModel({
			Name: request.Name,
			ContactPerson: request.ContactPerson,
			Phone: request.Phone,
			Email: request.Email,
			Company: company._id,
		});
		await newClient.save();
		await newClient.populate("Company");
		return newClient;
	}

	async UpdateClient(request: UpdateClientInput): Promise<Client> {
		const updatedClient = await this.clientModel.findByIdAndUpdate(
			request.Id,
			{
				Name: request.Name,
				ContactPerson: request.ContactPerson,
				Phone: request.Phone,
				Email: request.Email,
			},
			{ new: true },
		);
		return Promise.resolve(updatedClient);
	}

	async Delete(id: ObjectId): Promise<boolean> {
		const result = await this.clientModel.deleteOne({ _id: id });
		if (result.deletedCount === 0) {
			throw new Error(`client with id: ${id} does not exist`);
		}
		return true;
	}
}
