import { Field, ObjectType } from "@nestjs/graphql";
import { Prop } from "@nestjs/mongoose";
import { ObjectId, SchemaTypes } from "mongoose";

@ObjectType()
export class BaseEntity {
	@Field(() => String)
	_id: ObjectId | string;
	@Prop({ type: SchemaTypes.Date, default: Date.now })
	@Field()
	CreatedAt: Date;
}
