import { Injectable } from "@nestjs/common";
import { Company } from "../domain/entities/company.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Employee } from "../domain/entities/employee.entity";
import { CreateEmployeeInput } from "../domain/dtos/createEmployee.input";
import { UpdateEmployeeInput } from "../domain/dtos/updateEmployee.input";
import { ObjectId } from "mongodb";

@Injectable()
export class EmployeeService {
	private readonly employeeModel: Model<Employee>;
	private readonly companyModel: Model<Company>;

	constructor(
		@InjectModel(Employee.name)
		employeeModel: Model<Employee>,
		@InjectModel(Company.name)
		companyModel: Model<Company>,
	) {
		this.employeeModel = employeeModel;
		this.companyModel = companyModel;
	}

	GetByCompanyId(id: ObjectId): Promise<Employee[]> {
		return this.employeeModel.find({ Company: id });
	}
	GetAll(): Promise<Employee[]> {
		return this.employeeModel.find();
	}

	GetById(id: ObjectId): Promise<Employee> {
		return this.employeeModel.findById(id);
	}

	async Create(request: CreateEmployeeInput): Promise<Employee> {
		const company = await this.companyModel.findById(request.CompanyId);
		if (!company) {
			throw new Error(
				`company with id: ${request.CompanyId} does not exist`,
			);
		}

		const newEmployee = new this.employeeModel({
			FirstName: request.FirstName,
			LastName: request.LastName,
			Position: request.Position,
			Salary: request.Salary,
			Company: request.CompanyId,
		});
		await newEmployee.save();
		await newEmployee.populate("Company");
		return newEmployee;
	}

	async UpdateEmployee(request: UpdateEmployeeInput): Promise<Employee> {
		const updatedEmployee = await this.employeeModel.findByIdAndUpdate(
			request.Id,
			{
				FirstName: request.FirstName,
				LastName: request.LastName,
				Position: request.Position,
				Salary: request.Salary,
			},
			{ new: true },
		);
		return Promise.resolve(updatedEmployee);
	}

	async Delete(id: ObjectId): Promise<boolean> {
		const result = await this.employeeModel.deleteOne({ _id: id });
		if (result.deletedCount === 0) {
			throw new Error(`employee with id: ${id} does not exist`);
		}
		return true;
	}
}
