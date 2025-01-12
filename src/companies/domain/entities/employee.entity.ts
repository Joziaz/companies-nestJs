import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "./baseEntity";
import { Project } from "./project.entity";
import { Company } from "./company.entity";

@ObjectType()
export class Employee extends BaseEntity {
	@Field()
	FirstName: string;

	@Field()
	LastName: string;

	@Field()
	Position: string;

	@Field()
	DepartmentId: number;

	@Field(() => [Project], { nullable: true })
	Projects?: Project[];

	@Field(() => Company)
	CompanyId: Company;
}
