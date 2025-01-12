import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Repository } from "../domain/repository";
import { BaseEntity } from "../domain/entities/baseEntity";
import { InjectModel } from "@nestjs/mongoose";
import { Company } from "../domain/entities/company.entity";

@Injectable()
export class MongoDbRepository<T extends BaseEntity> implements Repository<T> {
	constructor(@InjectModel(Company.name) private readonly model: Model<T>) {}
	GetAll(): Promise<T[]> {
		return this.model.find();
	}
	GetById(id: string): Promise<T> {
		return this.model.findById(id);
	}
	async Exist(id: string): Promise<boolean> {
		const entity = await this.model.exists({ id });
		return entity === null;
	}
	Save(entity: T): Promise<T> {
		const createdEntity = new this.model(entity);
		return createdEntity.save();
	}
	async Update(entity: T): Promise<void> {
		const createdEntity = new this.model(entity);
		await createdEntity.updateOne();
		return Promise.resolve();
	}
	Delete(id: string): Promise<boolean> {
		this.model.deleteOne({ _id: id });
		return Promise.resolve(true);
	}
}
