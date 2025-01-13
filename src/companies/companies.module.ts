import { Module } from "@nestjs/common";
import { CompaniesService } from "./application/companies.service";
import { CompaniesResolver } from "./companies.resolver";
import { Company, CompanySchema } from "./domain/entities/company.entity";
import { ClientResolver } from "./clients.resolver";
import { ClientService } from "./application/clients.service";
import { Client, ClientSchema } from "./domain/entities/client.entity";
import { Employee, EmployeeSchema } from "./domain/entities/employee.entity";
import { Task, TaskSchema } from "./domain/entities/task.entity";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Company.name,
				schema: CompanySchema,
			},
			{
				name: Client.name,
				schema: ClientSchema,
			},
			{
				name: Employee.name,
				schema: EmployeeSchema,
			},
			{
				name: Task.name,
				schema: TaskSchema,
			},
		]),
	],
	providers: [
		CompaniesService,
		CompaniesResolver,
		ClientService,
		ClientResolver,
	],
})
export class CompaniesModule {}
