import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "./baseEntity";
import { Company } from "./company.entity";

@ObjectType()
export class Department extends BaseEntity {
	@Field()
	Name: string;

	@Field()
	Description: string;

	@Field()
	ManagerId: number;

	@Field(() => Company)
	CompanyId: Company;
}
