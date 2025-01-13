import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsBoolean, IsOptional } from "class-validator";
import { ObjectId } from "mongodb";

@InputType()
export class AssignTaskInput {
	@Field(() => ObjectId)
	TaskId: ObjectId;
	@IsArray()
	@Field(() => [ObjectId])
	Employees: ObjectId[];
	@IsBoolean()
	@IsOptional()
	@Field({ nullable: true, defaultValue: false })
	UnassingTask: boolean;
}
