import { BaseEntity } from "../../src/companies/domain/entities/baseEntity";
import { MemoryRepository } from "../../src/companies/infrastructure/memoryRepository";

describe("MemoryRepository", () => {
	let repository: MemoryRepository<BaseEntity>;
	let entity1: BaseEntity;
	let entity2: BaseEntity;

	beforeEach(async () => {
		// Initialize the repository with a seed
		repository = new MemoryRepository();
		entity1 = new BaseEntity();
		entity2 = new BaseEntity();
		await repository.Save(entity1);
		await repository.Save(entity2);
	});

	afterEach(() => {
		// Clean the repository and entities
		entity1 = new BaseEntity();
		entity2 = new BaseEntity();
		repository = new MemoryRepository();
	});
	describe("get all entities", () => {
		test("return all the entities", async () => {
			const entities = await repository.GetAll();
			expect(entities.length).toBe(2);
		});
	});

	describe("get entity by Id", () => {
		test("return null when no exist the id", async () => {
			const entity = await repository.GetById("a");
			expect(entity).toBeNull();
		});

		test("return the correct entity", async () => {
			const entity = await repository.GetById(entity1.Id);
			expect(entity).toBe(entity1);
			expect(entity).toEqual(entity1);
		});
	});

	describe("check if entity exists", () => {
		test("return false when entity does not exist", async () => {
			const exists = await repository.Exist("a");
			expect(exists).toBeFalsy();
		});

		test("return true when entity exists", async () => {
			const exists = await repository.Exist(entity1.Id);
			expect(exists).toBeTruthy();
		});
	});

	describe("save entity", () => {
		test("save add an Id and createdAt", async () => {
			const newEntity = new BaseEntity();
			const savedEntity = await repository.Save(newEntity);
			expect(savedEntity.Id).toBeDefined();
			expect(savedEntity.CreatedAt).toBeDefined();
		});
		test("save a new entity", async () => {
			const newEntity = new BaseEntity();
			await repository.Save(newEntity);
			const entity = await repository.GetById(newEntity.Id);
			expect(entity).toBe(newEntity);
		});

		test("throw error when entity already exists", async () => {
			await expect(
				async () => await repository.Save(entity1),
			).rejects.toThrow(`entity with id: ${entity1.Id} alredy exist`);
		});
	});

	describe("update entity", () => {
		test("update an existing entity", async () => {
			const updatedEntity = { ...entity1, IsDeleted: true };
			await repository.Update(updatedEntity);
			const entity = await repository.GetById(entity1.Id);
			expect(entity).toBe(updatedEntity);
		});

		test("throw error when entity does not exist", async () => {
			const nonExistentEntity = {
				Id: "A",
				CreatedAt: new Date(),
				IsDeleted: false,
			};
			await expect(async () =>
				repository.Update(nonExistentEntity),
			).rejects.toThrow(
				`entity with id: ${nonExistentEntity.Id} not exist`,
			);
		});
	});

	describe("delete entity", () => {
		test("delete an existing entity", async () => {
			await repository.Delete(entity1.Id);
			const entity = await repository.GetById(entity1.Id);
			expect(entity).toBeNull();
		});

		test("throw error when entity does not exist", async () => {
			await expect(
				async () => await repository.Delete("a"),
			).rejects.toThrow(`entity with id: a not exist`);
		});
	});
});
