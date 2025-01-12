import { BaseEntity } from "../domain/entities/baseEntity";
import { Repository } from "../domain/repository";

export class MemoryRepository<T extends BaseEntity> implements Repository<T> {
	private readonly dict: Map<string, T>;
	constructor() {
		this.dict = new Map<string, T>();
	}
	GetAll(): Promise<T[]> {
		const entities = new Array<T>(this.dict.size);
		let index = 0;
		for (const [, value] of this.dict) {
			entities[index++] = value;
		}
		return Promise.resolve(entities);
	}
	GetById(id: string): Promise<T> {
		if (!this.dict.has(id)) {
			return null;
		}
		const entity = this.dict.get(id);
		return Promise.resolve(entity);
	}

	Exist(int: string): Promise<boolean> {
		const exist = this.dict.has(int);
		return Promise.resolve(exist);
	}

	Save(entity: T): Promise<T> {
		if (this.dict.has(entity.Id)) {
			throw Error(`entity with id: ${entity.Id} alredy exist`);
		}

		entity.Id = crypto.randomUUID().toString();
		entity.CreatedAt = new Date();
		this.dict.set(entity.Id, entity);
		return Promise.resolve(entity);
	}

	Update(entity: T): Promise<void> {
		if (!this.dict.has(entity.Id)) {
			throw Error(`entity with id: ${entity.Id} not exist`);
		}

		this.dict.set(entity.Id, entity);
		return Promise.resolve();
	}

	Delete(id: string): Promise<boolean> {
		if (!this.dict.has(id)) {
			throw Error(`entity with id: ${id} not exist`);
		}
		this.dict.delete(id);
		return Promise.resolve(true);
	}
}
