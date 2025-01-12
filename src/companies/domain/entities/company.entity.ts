import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "./baseEntity";
import { Department } from "./department.entity";
import { Employee } from "./employee.entity";
import { Client } from "./client.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CompanyDocument = HydratedDocument<Company>;
@Schema()
@ObjectType()
export class Company extends BaseEntity {
	constructor(name: string, address: string, phone: string, email: string) {
		super();
		this.Name = name;
		this.Address = address;
		this.Phone = phone;
		this.Email = email;
	}
	@Prop({ required: true })
	@Field()
	Name: string;
	@Prop({ required: true })
	@Field()
	Address: string;
	@Prop({ required: true })
	@Field()
	Phone: string;
	@Prop({ required: true })
	@Field()
	Email: string;

	@Field(() => [Employee], { nullable: true })
	Employees?: Employee[];

	@Field(() => [Department], { nullable: true })
	Departments?: Department[];

	@Field(() => [Client], { nullable: true })
	Clients?: Client[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
