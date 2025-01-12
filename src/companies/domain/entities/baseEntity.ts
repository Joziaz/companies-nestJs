import { Field, ObjectType } from "@nestjs/graphql";
import { Prop } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@ObjectType()
export class BaseEntity {
	@Prop({ type: SchemaTypes.ObjectId })
	@Field()
	Id: string;
	@Prop({ type: SchemaTypes.Date, default: Date.now })
	@Field()
	CreatedAt: Date;
}
