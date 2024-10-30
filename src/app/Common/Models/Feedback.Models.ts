import { CourseModels } from "./Course.Models";
import { InstructorModels } from "./Instructor.Models";
import { UserModels } from "./User.Models";


export namespace FeedbackModels {

	export class Feedback {
		Id!: number;
		Text!: string | null;
		Rating!: number;
		CreatedBy!: number;
		CreatedOn!: Date;
		IsDeleted!: boolean;
		InstructorId!: number | null;
		CourseId!: number | null;

		User!: UserModels.User
		Course!: CourseModels.Course;
		Instructor!: InstructorModels.Instructor;
	}

}
