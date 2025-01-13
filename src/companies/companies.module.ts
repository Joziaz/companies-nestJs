import { Module } from "@nestjs/common";
import { CompaniesService } from "./services/companies.service";
import { CompaniesResolver } from "./companies.resolver";
import { Company, CompanySchema } from "./domain/entities/company.entity";
import { ClientResolver } from "./clients.resolver";
import { ClientService } from "./services/clients.service";
import { Client, ClientSchema } from "./domain/entities/client.entity";
import { Employee, EmployeeSchema } from "./domain/entities/employee.entity";
import { Task, TaskSchema } from "./domain/entities/task.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskService } from "./services/task.service";
import { TaskResolver } from "./task.resolver";
import { EmployeeService } from "./services/employee.service";
import { EmployeeResolver } from "./employee.resolver";

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
		TaskService,
		TaskResolver,
		EmployeeService,
		EmployeeResolver,
	],
})
export class CompaniesModule {}
