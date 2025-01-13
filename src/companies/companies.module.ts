import { Module } from "@nestjs/common";
import { CompaniesService } from "./services/companies.service";
import { Company, CompanySchema } from "./domain/entities/company.entity";
import { ClientService } from "./services/clients.service";
import { Client, ClientSchema } from "./domain/entities/client.entity";
import { Employee, EmployeeSchema } from "./domain/entities/employee.entity";
import { Task, TaskSchema } from "./domain/entities/task.entity";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskService } from "./services/task.service";
import { EmployeeService } from "./services/employee.service";
import { CompaniesResolver } from "./services/companies.resolver";
import { ClientResolver } from "./services/clients.resolver";
import { TaskResolver } from "./services/task.resolver";
import { EmployeeResolver } from "./services/employee.resolver";

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
