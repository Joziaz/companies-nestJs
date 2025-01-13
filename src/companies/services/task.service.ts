import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectId } from "mongodb";
import { CreateTaskInput } from "../domain/dtos/createTask.input";
import { Task } from "../domain/entities/task.entity";
import { Client } from "../domain/entities/client.entity";
import { UpdateTaskInput } from "../domain/dtos/updateTask.input";
import { AssignTaskInput } from "../domain/dtos/assignTask.input";

@Injectable()
export class TaskService {
	private readonly taskModel: Model<Task>;
	private readonly clientModel: Model<Client>;

	constructor(
		@InjectModel(Task.name)
		TaskModel: Model<Task>,
		@InjectModel(Client.name)
		companyModel: Model<Client>,
	) {
		this.taskModel = TaskModel;
		this.clientModel = companyModel;
	}

	GetByClientId(id: ObjectId): Promise<Task[]> {
		return this.taskModel.find({ TaskRequestor: id });
	}

	GetAll(): Promise<Task[]> {
		return this.taskModel.find();
	}

	GetById(id: ObjectId): Promise<Task> {
		return this.taskModel.findById(id);
	}

	async Create(request: CreateTaskInput): Promise<Task> {
		const client = await this.clientModel.findById(request.TaskRequestorId);
		if (!client) {
			throw new Error(
				`company with id: ${request.TaskRequestorId} does not exist`,
			);
		}

		const newTask = new this.taskModel({
			Title: request.Title,
			Description: request.Description,
			DueDate: request.DueDate,
			TaskRequestor: client,
		});
		await newTask.save();
		await newTask.populate("TaskRequestor");
		return newTask;
	}

	async UpdateTask(request: UpdateTaskInput): Promise<Task> {
		const updatedTask = await this.taskModel
			.findByIdAndUpdate(
				request.Id,
				{
					Title: request.Title,
					Description: request.Description,
					Completed: request.Completed,
					DueDate: request.DueDate,
					AssignedEmployees: request.Employees,
				},
				{ new: true },
			)
			.populate("TaskRequestor");
		return Promise.resolve(updatedTask);
	}

	async Delete(id: ObjectId): Promise<boolean> {
		const result = await this.taskModel.deleteOne({ _id: id });
		if (result.deletedCount === 0) {
			throw new Error(`task with id: ${id} does not exist`);
		}
		return true;
	}

	async AssingTask(request: AssignTaskInput): Promise<Task> {
		const removeEmployeesUpdate = {
			$pull: { AssignedEmployees: { $in: request.Employees } },
		};
		const addEmployeesUpdate = {
			$addToSet: {
				AssignedEmployees: { $each: request.Employees },
			},
		};

		const task = await this.taskModel
			.findByIdAndUpdate(
				request.TaskId,
				request.UnassingTask
					? removeEmployeesUpdate
					: addEmployeesUpdate,
				{ new: true },
			)
			.populate({
				path: "AssignedEmployees",
				model: "Employee",
			});

		return task;
	}
}
