import { BaseEntity } from "../domain/entities/baseEntity";
import { Repository } from "../domain/repository";

export class MemoryRepository<T extends BaseEntity> implements Repository<T> {
	private readonly dict: Map<number, T>;
	constructor() {
		this.dict = new Map<number, T>();
	}
	GetAll(): T[] {
		const entities = new Array<T>(this.dict.size);
		let index = 0;
		for (const [, value] of this.dict) {
			entities[index++] = value;
		}
		return entities;
	}
	GetById(id: number): T {
		if (!this.dict.has(id)) {
			return null;
		}
		return this.dict.get(id);
	}

	Exist(int: number): boolean {
		return this.dict.has(int);
	}

	Save(entity: T): T {
		if (this.dict.has(entity.Id)) {
			throw Error(`entity with id: ${entity.Id} alredy exist`);
		}

		entity.Id = Math.floor(Math.random() * 100 + 1);
		entity.CreatedAt = new Date();
		this.dict.set(entity.Id, entity);
		return entity;
	}

	Update(entity: T): void {
		if (!this.dict.has(entity.Id)) {
			throw Error(`entity with id: ${entity.Id} not exist`);
		}

		this.dict.set(entity.Id, entity);
	}

	Delete(id: number): boolean {
		if (!this.dict.has(id)) {
			throw Error(`entity with id: ${id} not exist`);
		}
		this.dict.delete(id);
		return true;
	}
}
