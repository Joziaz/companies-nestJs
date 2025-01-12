import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateCompanyInput } from "./createCompany.input";
import { ObjectId } from "mongoose";

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {
	@Field(() => String)
	Id: ObjectId | string;
}
