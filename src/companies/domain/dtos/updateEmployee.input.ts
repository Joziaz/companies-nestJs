import { Field, InputType } from "@nestjs/graphql";
import { IsNumber, IsOptional, MaxLength } from "class-validator";
import { ObjectId } from "mongodb";

@InputType()
export class UpdateEmployeeInput {
	@Field(() => ObjectId)
	Id: ObjectId;
	@MaxLength(25)
	@IsOptional()
	@Field({ nullable: true, defaultValue: undefined })
	FirstName?: string;
	@MaxLength(25)
	@IsOptional()
	@Field({ nullable: true, defaultValue: undefined })
	LastName?: string;
	@MaxLength(20)
	@IsOptional()
	@Field({ nullable: true, defaultValue: undefined })
	Position?: string;
	@IsNumber()
	@IsOptional()
	@Field({ nullable: true, defaultValue: undefined })
	Salary?: number;
}
