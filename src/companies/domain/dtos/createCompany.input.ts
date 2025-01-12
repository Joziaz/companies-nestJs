import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

@InputType()
export class CreateCompanyInput {
	@MaxLength(25)
	@IsNotEmpty()
	@Field()
	Name: string;
	@MaxLength(200)
	@IsNotEmpty()
	@Field()
	Address: string;
	@MaxLength(15)
	@IsNotEmpty()
	@Field()
	Phone: string;
	@IsEmail({}, { message: "invalid email" })
	@IsNotEmpty()
	@Field()
	Email: string;
}
