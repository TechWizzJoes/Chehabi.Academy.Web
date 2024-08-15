import { CourseModels } from "./Course.Models";
import { FeedbackModels } from "./Feedback.Models";
import { UserModels } from "./User.Models";

export namespace InstructorModels {

	export class Instructor {
		Id!: number;
		UserId!: number;
		Courses!: CourseModels.Course[];
		Feedbacks!: FeedbackModels.Feedback[];
		User!: UserModels.User;
	}

	export class InstructorReqModel {

	}

}
