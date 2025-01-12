import { BaseEntity } from "./entities/baseEntity";

export interface Repository<T extends BaseEntity> {
	GetAll(): T[];
	GetById(int: number): T;
	Exist(int: number): boolean;
	Save(entity: T): T;
	Update(entity: T): void;
	Delete(id: number): void;
}
