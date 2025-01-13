import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateTaskInput } from "./domain/dtos/createTask.input";
import { Task } from "./domain/entities/task.entity";
import { UpdateTaskInput } from "./domain/dtos/updateTask.input";
import { TaskService } from "./application/task.service";
import { AssignTaskInput } from "./domain/dtos/assignTask.input";
import { ObjectId } from "mongodb";

@Resolver()
export class TaskResolver {
	constructor(private readonly taskService: TaskService) {}
	@Query(() => [Task])
	Tasks(): Promise<Task[]> {
		return this.taskService.GetAll();
	}
	@Query(() => [Task])
	TasksByClientId(
		@Args("clientId", { type: () => ObjectId })
		companyId: ObjectId,
	): Promise<Task[]> {
		return this.taskService.GetByClientId(companyId);
	}

	@Query(() => Task, { nullable: true })
	TaskById(
		@Args("id", { type: () => ObjectId }) id: ObjectId,
	): Promise<Task> {
		return this.taskService.GetById(id);
	}

	@Mutation(() => Task)
	CreateTask(@Args("createTaskInput") input: CreateTaskInput): Promise<Task> {
		return this.taskService.Create(input);
	}

	@Mutation(() => Task)
	UpdateTask(@Args("updateTaskInput") input: UpdateTaskInput): Promise<Task> {
		return this.taskService.UpdateTask(input);
	}

	@Mutation(() => Task)
	TaskAssigment(@Args("assingTask") input: AssignTaskInput): Promise<Task> {
		return this.taskService.AssingTask(input);
	}

	@Mutation(() => Boolean)
	DeleteTask(
		@Args("id", { type: () => ObjectId })
		id: ObjectId,
	): Promise<boolean> {
		return this.taskService.Delete(id);
	}
}
