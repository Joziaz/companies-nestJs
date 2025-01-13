import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateClientInput } from "./domain/dtos/createClient.input";
import { Client } from "./domain/entities/client.entity";
import { ClientService } from "./application/clients.service";
import { UpdateClientInput } from "./domain/dtos/updateClientInput";
import { ParseObjectIdPipe } from "src/shared/ObjectIdParse.pipe";
import { ObjectId } from "mongoose";

@Resolver()
export class ClientResolver {
	constructor(private readonly ClientService: ClientService) {}
	@Query(() => [Client])
	Clients(): Promise<Client[]> {
		return this.ClientService.GetAll();
	}
	@Query(() => [Client])
	ClientsByCompany(
		@Args("companyId", { type: () => String }, ParseObjectIdPipe)
		companyId: ObjectId,
	): Promise<Client[]> {
		return this.ClientService.GetByCompanyId(companyId);
	}

	@Query(() => Client, { nullable: true })
	ClientById(
		@Args("id", { type: () => String }, ParseObjectIdPipe) id: ObjectId,
	): Promise<Client> {
		return this.ClientService.GetById(id);
	}

	@Mutation(() => Client)
	CreateClient(
		@Args("createClientInput") input: CreateClientInput,
	): Promise<Client> {
		return this.ClientService.Create(input);
	}

	@Mutation(() => Client)
	UpdateClient(
		@Args("updateClientInput") input: UpdateClientInput,
	): Promise<Client> {
		return this.ClientService.UpdateClient(input);
	}

	@Mutation(() => Boolean)
	DeleteClient(
		@Args("id", { type: () => String }, ParseObjectIdPipe)
		id: ObjectId,
	): Promise<boolean> {
		return this.ClientService.Delete(id);
	}
}
