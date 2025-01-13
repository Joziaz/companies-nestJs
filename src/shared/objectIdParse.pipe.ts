import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { isValidObjectId, Types } from "mongoose";

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
	transform(value: any) {
		const isValid = isValidObjectId(value);
		if (!isValid) {
			throw new BadRequestException(`${value} is not a valid objectId`);
		}

		return Types.ObjectId.createFromHexString(value);
	}
}
