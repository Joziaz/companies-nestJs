import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class BaseEntity {
	@Field(() => Int)
	Id: number;
	@Field()
	CreatedAt: Date;
}
