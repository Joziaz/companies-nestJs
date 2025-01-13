import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "./baseEntity";
import { Employee } from "./employee.entity";
import { Client } from "./client.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

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
	@Field()
	Completed: boolean;
	@Prop()
	@Field()
	UpdatedAt: Date;
	@Prop()
	@Field({ nullable: true })
	DueDate?: Date;
	@Prop({ type: [{ type: Types.ObjectId, ref: "Employee" }] })
	@Field(() => [Employee], { nullable: true })
	AssignedEmployees?: Employee[];
	@Prop({ type: Types.ObjectId, ref: "Client" })
	@Field(() => Client)
	Client: Client;

	MarkAsCompleted(): void {
		this.Completed = true;
		this.UpdatedAt = new Date();
	}
}

export const TaskSchema = SchemaFactory.createForClass(Task);
