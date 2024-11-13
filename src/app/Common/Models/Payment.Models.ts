import { UserModels } from "./User.Models";

export namespace PaymentModels {

	export class Payment {
		Id!: number;
		StripeSessionId!: string;
		StripePaymentIntent!: string;
		UserId!: number;
		RefrenceNumber!: string;
		Currency!: string;
		TotalAmount!: string;
		PaymentMethod!: string;
		PaymentEmail!: string;
		PaymentPhone!: string | null;
		PaymentName!: string;
		CreatedOn!: Date | null;

		User!: UserModels.User | null;
	}
}
