import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional, MaxLength } from "class-validator";
import { ObjectId } from "mongodb";

@InputType()
export class UpdateCompanyInput {
	@Field(() => ObjectId)
	Id: ObjectId;
	@MaxLength(25)
	@IsOptional()
	@Field({ nullable: true, defaultValue: undefined })
	Name?: string;
	@MaxLength(200)
	@IsOptional()
	@Field({ nullable: true, defaultValue: undefined })
	Address?: string;
	@MaxLength(15)
	@IsOptional()
	@Field({ nullable: true, defaultValue: undefined })
	Phone?: string;
	@IsEmail({}, { message: "invalid email" })
	@IsOptional()
	@Field({ nullable: true, defaultValue: undefined })
	Email?: string;
}
