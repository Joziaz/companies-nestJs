import { GraphQLScalarType, Kind } from "graphql";
import { ObjectId } from "mongodb";

export const ObjectIdScalar = new GraphQLScalarType({
	name: "ObjectId",
	description: "MongoDB ObjectId custom scalar typer",
	serialize: (value) => {
		if (!(value instanceof ObjectId)) {
			throw new Error("Provided value is not an instance of ObjectId");
		}
		return value.toHexString();
	},
	parseValue: (value: string) => {
		if (!ObjectId.isValid(value)) {
			throw new Error("Invalid ObjectId");
		}
		return ObjectId.createFromHexString(value);
	},
	parseLiteral: (ast) => {
		if (ast.kind !== Kind.STRING) {
			throw new Error("ObjectId must be a string");
		}
		if (!ObjectId.isValid(ast.value)) {
			throw new Error("Invalid ObjectId");
		}
		return ObjectId.createFromHexString(ast.value);
	},
});
