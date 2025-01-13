import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { EmployeeService } from "../services/employee.service";
import { ObjectId } from "mongodb";
import { CreateEmployeeInput } from "../domain/dtos/createEmployee.input";
import { UpdateEmployeeInput } from "../domain/dtos/updateEmployee.input";
import { Employee } from "../domain/entities/employee.entity";

@Resolver()
export class EmployeeResolver {
	constructor(private readonly EmployeeService: EmployeeService) {}
	@Query(() => [Employee])
	Employees(): Promise<Employee[]> {
		return this.EmployeeService.GetAll();
	}
	@Query(() => [Employee])
	EmployeesByCompany(
		@Args("companyId", { type: () => ObjectId })
		companyId: ObjectId,
	): Promise<Employee[]> {
		return this.EmployeeService.GetByCompanyId(companyId);
	}

	@Query(() => Employee, { nullable: true })
	EmployeeById(
		@Args("id", { type: () => ObjectId }) id: ObjectId,
	): Promise<Employee> {
		return this.EmployeeService.GetById(id);
	}

	@Mutation(() => Employee)
	CreateEmployee(
		@Args("createEmployeeInput") input: CreateEmployeeInput,
	): Promise<Employee> {
		return this.EmployeeService.Create(input);
	}

	@Mutation(() => Employee)
	UpdateEmployee(
		@Args("updateEmployeeInput") input: UpdateEmployeeInput,
	): Promise<Employee> {
		return this.EmployeeService.UpdateEmployee(input);
	}

	@Mutation(() => Boolean)
	DeleteEmployee(
		@Args("id", { type: () => ObjectId })
		id: ObjectId,
	): Promise<boolean> {
		return this.EmployeeService.Delete(id);
	}
}
