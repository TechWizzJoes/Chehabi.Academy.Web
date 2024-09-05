import { CourseModels } from "./Course.Models";

export namespace UserModels {

	export class User {
		Id!: number;
		FirstName!: string;
		LastName!: string;
		Birthdate!: string;
		IsActive!: boolean;
		IsDeleted!: boolean;
		IsSocial!: boolean;
		Email!: string;
		Password!: string;
		IsAdmin!: boolean;
		ProfilePicturePath?: string;
		Classes!: CourseModels.Class[];

		UserClasses!: UserClass[];
		UserCourses!: UserCourse[];

	}

	export class UserReqModel {
		Id!: number;
		FirstName!: string;
		LastName!: string;
		Birthdate!: string;
		Email!: string;
		ProfilePicturePath?: string;
	}

	export class UserClass {
		UserId!: number;
		ClassId!: number;
		CreatedAt!: Date;
		User!: UserModels.User;
		Class!: CourseModels.Class;
	}

	export class UserCourse {
		UserId!: number;
		CourseId!: number;
		CreatedAt!: Date | null;
		Course!: CourseModels.Course;
		User!: UserModels.User;
	}

}
