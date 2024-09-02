import { CourseModels } from "./Course.Models";
import { UserModels } from "./User.Models";

export namespace RatingModels {

	export class Rating {

		Id!: number;


		CourseId!: number;


		UserId!: number;


		Rating!: number;


		CreatedOn!: Date;
	}

}
