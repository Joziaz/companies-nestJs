import { BaseEntity } from "./entities/baseEntity";

export interface Repository<T extends BaseEntity> {
	GetAll(): Promise<T[]>;
	GetById(id: string): Promise<T>;
	Exist(id: string): Promise<boolean>;
	Save(entity: T): Promise<T>;
	Update(entity: T): Promise<void>;
	Delete(id: string): Promise<boolean>;
}
