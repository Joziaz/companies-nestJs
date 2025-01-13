import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateClientInput } from "./domain/dtos/createClient.input";
import { Client } from "./domain/entities/client.entity";
import { ClientService } from "./services/clients.service";
import { UpdateClientInput } from "./domain/dtos/updateClientInput";
import { ObjectId } from "mongodb";

@Resolver()
export class ClientResolver {
	constructor(private readonly ClientService: ClientService) {}
	@Query(() => [Client])
	Clients(): Promise<Client[]> {
		return this.ClientService.GetAll();
	}
	@Query(() => [Client])
	ClientsByCompany(
		@Args("companyId", { type: () => ObjectId })
		companyId: ObjectId,
	): Promise<Client[]> {
		return this.ClientService.GetByCompanyId(companyId);
	}

	@Query(() => Client, { nullable: true })
	ClientById(
		@Args("id", { type: () => ObjectId }) id: ObjectId,
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
		@Args("id", { type: () => ObjectId })
		id: ObjectId,
	): Promise<boolean> {
		return this.ClientService.Delete(id);
	}
}
