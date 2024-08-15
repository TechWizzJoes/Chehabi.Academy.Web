import { CourseTypeEnum } from "../Enums/CourseType.Enum";
import { Constants } from "../Settings/Constants";
import { InstructorModels } from "./Instructor.Models";
import { UserModels } from "./User.Models";

export namespace CourseModels {

	export class Course {
		Id!: number;
		Name!: string;
		TypeIdString: CourseTypeEnum = CourseTypeEnum.Live;
		Description!: string;
		Duration!: number;
		VideoPath!: string;
		FilePath!: string;
		StartDate: string = Constants.convertDateToYYYYMMDD(new Date());
		IsActive: boolean = true;
		IsDeleted!: boolean;
		Rating!: number;
		Raters!: number;
		ImageUrl!: string;
		Prerequisite!: string;
		ToBeLearned!: string;
		Price!: number;
		Classes!: Class[];
		InstructorId!: number;
		Instructor!: InstructorModels.Instructor;
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
		Sessions!: Session[];
	}

	export class Session {
		Id!: number;
		ClassId!: number;
		Date!: Date;
	}
}
