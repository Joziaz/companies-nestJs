import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateCompanyInput } from "./createCompany.input";

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
	@Field(() => Int)
	Id: number;
}
