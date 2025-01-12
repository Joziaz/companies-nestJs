import { BaseEntity } from "src/companies/domain/entities/baseEntity";
import { MemoryRepository } from "src/companies/infrastructure/memoryRepository";

describe("MemoryRepository", () => {
	let repository = new MemoryRepository();

	const entity1 = new BaseEntity();
	const entity2 = new BaseEntity();
	const entity3 = new BaseEntity();
	beforeEach(() => {
		// Initialize the repository with a seed
		repository.Save(entity1);
		repository.Save(entity2);
		repository.Save(entity3);
	});

	afterEach(() => {
		// Clean the repository and entities
		repository = new MemoryRepository();
	});
	describe("get all entities", () => {
		test("return all the entities", () => {
			const entities = repository.GetAll();
			expect(entities.length).toBe(3);
		});
	});

	describe("get entity by Id", () => {
		test("return null when no exist the id", () => {
			const entity = repository.GetById(4);
			expect(entity).toBeNull();
		});

		test("return the correct entity", () => {
			const entity = repository.GetById(entity1.Id);
			expect(entity).toBe(entity1);
			expect(entity).toEqual(entity1);
		});
	});

	describe("check if entity exists", () => {
		test("return false when entity does not exist", () => {
			const exists = repository.Exist(4);
			expect(exists).toBeFalsy();
		});

		test("return true when entity exists", () => {
			const exists = repository.Exist(entity1.Id);
			expect(exists).toBeTruthy();
		});
	});

	describe("save entity", () => {
		test("save add an Id and createdAt", () => {
			const newEntity = new BaseEntity();
			const savedEntity = repository.Save(newEntity);
			expect(savedEntity.Id).toBeDefined();
			expect(savedEntity.CreatedAt).toBeDefined();
		});
		test("save a new entity", () => {
			const newEntity = new BaseEntity();
			repository.Save(newEntity);
			const entity = repository.GetById(newEntity.Id);
			expect(entity).toBe(newEntity);
		});

		test("throw error when entity already exists", () => {
			expect(() => repository.Save(entity1)).toThrow(
				`entity with id: ${entity1.Id} alredy exist`,
			);
		});
	});

	describe("update entity", () => {
		test("update an existing entity", () => {
			const updatedEntity = { ...entity1, IsDeleted: true };
			repository.Update(updatedEntity);
			const entity = repository.GetById(entity1.Id);
			expect(entity).toBe(updatedEntity);
		});

		test("throw error when entity does not exist", () => {
			const nonExistentEntity = {
				Id: 4,
				CreatedAt: new Date(),
				IsDeleted: false,
			};
			expect(() => repository.Update(nonExistentEntity)).toThrow(
				`entity with id: ${nonExistentEntity.Id} not exist`,
			);
		});
	});

	describe("delete entity", () => {
		test("delete an existing entity", () => {
			repository.Delete(entity1.Id);
			const entity = repository.GetById(entity1.Id);
			expect(entity).toBeNull();
		});

		test("throw error when entity does not exist", () => {
			expect(() => repository.Delete(4)).toThrow(
				`entity with id: 4 not exist`,
			);
		});
	});
});
