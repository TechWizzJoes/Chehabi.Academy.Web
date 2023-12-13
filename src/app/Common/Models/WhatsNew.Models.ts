import { CourseModels } from "./Course.Models";

export namespace WhatsNewModels {

	export class WhatsNew {
		Id!: number;
		Title!: string | null;
		Text!: string | null;
		PicturePath!: string | null;
		IsActive!: boolean | null;
		IsDeleted!: boolean | null;
	}

}
