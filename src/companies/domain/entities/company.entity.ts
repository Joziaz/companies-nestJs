import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "./baseEntity";
import { Employee } from "./employee.entity";
import { Client } from "./client.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

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
	@Prop()
	@Field()
	Name: string;
	@Prop()
	@Field()
	Address: string;
	@Prop()
	@Field()
	Phone: string;
	@Prop()
	@Field()
	Email: string;
	@Prop({ type: [{ type: Types.ObjectId, ref: "Employee" }] })
	@Field(() => [Employee], { nullable: true })
	Employees?: Employee[];
	@Prop({ type: [{ type: Types.ObjectId, ref: "Client" }] })
	@Field(() => [Client], { name: "Clients", nullable: true })
	Clients?: Client[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
