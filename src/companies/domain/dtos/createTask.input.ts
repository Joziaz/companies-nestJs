import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { ObjectId } from "mongodb";

@InputType()
export class CreateTaskInput {
	@MaxLength(100)
	@IsNotEmpty()
	@Field()
	Title: string;
	@IsNotEmpty()
	@Field()
	Description: string;
	@IsDate()
	@IsOptional()
	@Field({ nullable: true, defaultValue: undefined })
	DueDate?: Date;

	@Field(() => ObjectId)
	TaskRequestorId: ObjectId;
}
