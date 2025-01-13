import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseEntity } from "./baseEntity";
import { HydratedDocument, Types } from "mongoose";
import { Employee } from "./employee.entity";
import { Client } from "./client.entity";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
@ObjectType()
export class Task extends BaseEntity {
	@Prop()
	@Field()
	Title: string;
	@Prop()
	@Field()
	Description: string;
	@Prop()
	@Field({ nullable: true })
	DueDate?: Date;
	@Prop({ type: [{ type: Types.ObjectId, ref: "Employee" }] })
	@Field(() => [Employee], { nullable: true })
	AssignedEmployees?: Employee[];
	@Prop({ type: Types.ObjectId, ref: "Client" })
	@Field(() => Client)
	TaskRequestor: Client;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
