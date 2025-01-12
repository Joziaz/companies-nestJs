import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "./baseEntity";
import { Employee } from "./employee.entity";
import { Company } from "./company.entity";

@ObjectType()
export class Project extends BaseEntity {
	@Field()
	Name: string;

	@Field()
	Description: string;

	@Field()
	StartDate: Date;

	@Field({ nullable: true })
	EndDate: Date | null;

	@Field(() => [Employee])
	Employees: Employee[];

	@Field(() => Company)
	CompanyId: Company;
}
