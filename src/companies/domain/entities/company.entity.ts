import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "./baseEntity";
import { Department } from "./department.entity";
import { Employee } from "./employee.entity";
import { Client } from "./client.entity";

@ObjectType()
export class Company extends BaseEntity {
	constructor(name: string, address: string, phone: string, email: string) {
		super();
		this.Name = name;
		this.Address = address;
		this.Phone = phone;
		this.Email = email;
	}
	@Field()
	Name: string;

	@Field()
	Address: string;

	@Field()
	Phone: string;

	@Field()
	Email: string;

	@Field(() => [Employee], { nullable: true })
	Employees?: Employee[];

	@Field(() => [Department], { nullable: true })
	Departments?: Department[];

	@Field(() => [Client], { nullable: true })
	Clients?: Client[];
}
