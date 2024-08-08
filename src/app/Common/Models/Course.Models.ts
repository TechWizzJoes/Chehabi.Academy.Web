import { UserModels } from "./User.Models";

export namespace CourseModels {

	export class Course {
		Id!: number;
		Name!: string;
		Description!: string;
		Duration!: number;
		VideoPath!: string;
		FilePath!: string;
		StartDate!: Date;
		IsActive!: boolean;
		IsDeleted!: boolean;
		Rating!: number;
		Raters!: number;
		ImageUrl!: string;
		Prerequisite!: string;
		ToBeLearned!: string;
		Price!: number;
		Classes!: Class[];
		InstructorId!: number;
		Instructor!: UserModels.User;

	}

	export class Class {
		Id!: number;
		CourseId!: number;
		StartDate!: string;
		EndDate!: string;
		MaxCapacity!: number;
		Period!: string;
		CurrentIndex!: number;
		IsActive!: boolean;
		IsDeleted!: boolean;
		ClassOccurances!: ClassOccurance[];
	}

	export class ClassOccurance {
		Id!: number;
		ClassId!: number;
		Occurance!: string;
	}
}
