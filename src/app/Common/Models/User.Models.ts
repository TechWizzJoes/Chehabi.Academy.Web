import { CourseModels } from "./Course.Models";

export namespace UserModels {

	export class User {
		Id!: number;
		FirstName!: string;
		LastName!: string;
		Birthdate!: string;
		IsActive!: boolean;
		IsDeleted!: boolean;
		Email!: string;
		Password!: string;
		IsAdmin!: boolean;
		ProfilePicturePath?: string;
		Classes!: CourseModels.Class[];
	}

	export class UserReqModel {
		Id!: number;
		FirstName!: string;
		LastName!: string;
		Birthdate!: string;
		Email!: string;
		ProfilePicturePath?: string;
	}

}
