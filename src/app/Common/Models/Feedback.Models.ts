import { CourseModels } from "./Course.Models";
import { UserModels } from "./User.Models";

export namespace FeedbackModels {

	export class Feedback {
		Id!: number;
		Text!: string | null;
		UserId!: number | null;
		IsDeleted!: boolean | null;
		CreatedDate!: Date | null;
		User!: UserModels.User
	}

}
