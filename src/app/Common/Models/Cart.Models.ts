import { CourseModels } from "./Course.Models";
import { UserModels } from "./User.Models";

export namespace CartModels {

	export class Cart {
		Id!: number;
		UserId!: number;
		UpdatedAt!: Date | null;
		Discount!: number | null;
		Currency!: string | null;
		PromoCode!: string | null;
		Total!: number | null;
		User!: UserModels.User;
		CartItems: CartItem[] = [];
	}

	export class CartItem {
		Id!: number;
		CartId!: number;
		CourseId!: number | null;
		ClassId!: number | null;
		Quantity!: number | null;
		Price!: number | null;
		SubTotal!: number | null;
		Cart!: CartModels.Cart;
		Class!: CourseModels.Class;
		Course!: CourseModels.Course;
	}

}
