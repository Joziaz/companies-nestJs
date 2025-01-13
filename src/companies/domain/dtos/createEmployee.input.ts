import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";
import { ObjectId } from "mongodb";

@InputType()
export class CreateEmployeeInput {
	@MaxLength(25)
	@IsNotEmpty()
	@Field()
	FirstName: string;
	@MaxLength(25)
	@IsNotEmpty()
	@Field()
	LastName: string;
	@MaxLength(20)
	@IsNotEmpty()
	@Field()
	Position: string;
	@IsNumber()
	@IsNotEmpty()
	@Field()
	Salary: number;
	@Field(() => ObjectId)
	CompanyId: ObjectId;
}
