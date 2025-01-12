import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "./baseEntity";
import { Project } from "./project.entity";
import { Company } from "./company.entity";

@ObjectType()
export class Client extends BaseEntity {
	@Field()
	Name: string;

	@Field()
	ContactPerson: string;

	@Field()
	Phone: string;

	@Field()
	Email: string;

	@Field(() => [Project])
	ContractedProjects: Project[];

	@Field(() => Company)
	CompanyId: Company;
}
