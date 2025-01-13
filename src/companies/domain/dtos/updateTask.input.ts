import { Field, InputType } from "@nestjs/graphql";
import {
	IsArray,
	IsBoolean,
	IsDate,
	IsOptional,
	MaxLength,
} from "class-validator";
import { ObjectId } from "mongodb";

@InputType()
export class UpdateTaskInput {
	@Field()
	Id: string;
	@MaxLength(100)
	@IsOptional()
	@Field({ nullable: true, defaultValue: undefined })
	Title?: string;
	@Field({ nullable: true, defaultValue: undefined })
	Description?: string;
	@IsDate()
	@IsOptional()
	@Field({ nullable: true, defaultValue: undefined })
	DueDate?: Date;
	@IsBoolean()
	@IsOptional()
	@Field({ nullable: true, defaultValue: undefined })
	Completed?: boolean;
	@IsArray()
	@IsOptional()
	@Field(() => ObjectId, { nullable: true, defaultValue: undefined })
	Employees?: ObjectId[];
}
