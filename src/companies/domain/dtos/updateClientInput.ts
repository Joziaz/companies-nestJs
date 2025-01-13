import { Field, InputType } from "@nestjs/graphql";
import { IsObjectId } from "../../../shared/isObjectId.decorator";
import { IsEmail, MaxLength } from "class-validator";

@InputType()
export class UpdateClientInput {
	@IsObjectId()
	@Field()
	Id: string;
	@MaxLength(25)
	@Field({ nullable: true, defaultValue: undefined })
	Name?: string;
	@MaxLength(200)
	@Field({ nullable: true, defaultValue: undefined })
	ContactPerson?: string;
	@MaxLength(15)
	@Field({ nullable: true, defaultValue: undefined })
	Phone?: string;
	@IsEmail({}, { message: "invalid email" })
	@Field({ nullable: true, defaultValue: undefined })
	Email?: string;
}
