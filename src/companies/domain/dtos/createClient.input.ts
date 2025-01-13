import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { IsObjectId } from "../../../shared/isObjectId.decorator";
import { ObjectId } from "mongoose";

@InputType()
export class CreateClientInput {
	@MaxLength(25)
	@IsNotEmpty()
	@Field()
	Name: string;
	@MaxLength(200)
	@IsNotEmpty()
	@Field()
	ContactPerson: string;
	@MaxLength(15)
	@IsNotEmpty()
	@Field()
	Phone: string;
	@IsEmail({}, { message: "invalid email" })
	@IsNotEmpty()
	@Field()
	Email: string;
	@IsObjectId()
	@Field(() => String)
	CompanyId: ObjectId;
}
