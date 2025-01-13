import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "./baseEntity";
import { Company } from "./company.entity";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ClientDocument = HydratedDocument<Client>;

@Schema()
@ObjectType()
export class Client extends BaseEntity {
	constructor(
		name: string,
		contactPerson: string,
		phone: string,
		email: string,
		company: Company,
	) {
		super();
		this.Name = name;
		this.ContactPerson = contactPerson;
		this.Phone = phone;
		this.Email = email;
		this.Company = company;
	}
	@Prop()
	@Field()
	Name: string;
	@Prop()
	@Field()
	ContactPerson: string;
	@Prop()
	@Field()
	Phone: string;
	@Prop()
	@Field()
	Email: string;
	@Prop({ type: Types.ObjectId, ref: "Company" })
	@Field(() => Company)
	Company: Company;
}
export const ClientSchema = SchemaFactory.createForClass(Client);
