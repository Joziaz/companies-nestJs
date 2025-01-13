import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "./baseEntity";
import { Company } from "./company.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Task } from "./task.entity";

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema()
@ObjectType()
export class Employee extends BaseEntity {
	@Prop()
	@Field()
	FirstName: string;
	@Prop()
	@Field()
	LastName: string;
	@Prop()
	@Field()
	Position: string;
	@Prop()
	@Field()
	Salary: number;
	@Prop({ type: [{ type: Types.ObjectId, ref: "Task" }] })
	@Field(() => [Task], { nullable: true })
	AssignedTask?: Task[];
	@Prop({ type: Types.ObjectId, ref: "Company" })
	@Field(() => Company)
	Company: Company;
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
