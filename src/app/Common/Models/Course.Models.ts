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
		Classes: Class[] = [new Class()];
		InstructorId!: number;
		Instructor!: InstructorModels.Instructor;
		CreatedOn!: Date;
		UpdatedOn!: Date;
		UserCourses!: UserModels.UserCourse[];

		MaxStartDate?: string; // for display
	}

	export class Class {
		Id!: number;
		Name!: string;
		CourseId!: number;
		StartDate: string = Constants.convertDateToYYYYMMDD(new Date());
		EndDate!: string;
		MaxCapacity!: number;
		Period: PeriodDto[] = [new PeriodDto()];
		CurrentIndex!: number;
		NumberOfSessions!: number;
		IsActive: boolean = true;
		IsDeleted!: boolean;
		CreatedOn!: Date;
		UpdatedOn!: Date;
		LiveSessions!: LiveSession[];
		Course!: Course;
		// CartItems!: CartModels.CartItem[];
		UserClasses!: UserModels.UserClass[];

		AvailableSlots!: number; // for display
		ShowSessions: boolean = false; // for display
		Quantity!: number; // for cart

	}

	export class LiveSession {
		Id!: number;
		ClassId!: number;
		StartDate!: Date;
		EndDate!: Date;
		Link!: string | null;
		Class!: Class;

		StartTimeString!: string; // for displaying only not in backend
		StartDateString!: string; // for displaying only not in backend
	}

	export class PeriodDto {
		Day: number = 0;
		Time: string = '12:00';
		DurationInMins: number = 60;
	}

	export class Filter {
		SearchInput!: string;
		Rating!: number;
		Type!: string;
		Level: Levels = new Levels();

	}
	export class Levels {
		Beginner!: boolean;
		Intermediate!: boolean;
		Advanced!: boolean;

	}
}
