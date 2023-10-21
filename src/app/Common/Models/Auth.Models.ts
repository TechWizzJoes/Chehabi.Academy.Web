export namespace AuthModels {
	export class LoginReqModel { }
	export class RegisterReqModel {
		Email!: string;
		Password!: string;
		RePassword!: string;
		BirthDate!: string;
		FirstName!: string;
		LastName!: string;
	}

	export class RefreshTokenReqModel { }

	export class CurrentUserResModel {
		Id!: number;
		IsAdmin!: boolean;
	}

	export class ExtensionPasswordResModel { }

	export class LoginResModel {
		AccessToken!: string;
		RefreshToken!: string;
		CurrentUser!: CurrentUserResModel;
	}

	export class RegisterResModel {
		AccessToken!: string;
		RefreshToken!: string;
		CurrentUser!: CurrentUserResModel;
	}

	export class RefreshTokenResModel {
		AccessToken!: string;
		RefreshToken!: string;
	}

	export class UserMenuResModel {
		Id!: number;
		ParentId!: number;
	}

	export class LoginModel {
		constructor(public Email: string, public Password: string) { }
	}

	export class RegisterModel {
		Email: string = '';
		Password: string = '';
		RePassword: string = '';
		BirthDate: string = '';
		FirstName: string = '';
		LastName: string = '';
		// constructor(public Email: string, public Password: string, public RePassword: string, public BirthDate: Date, public FirstName: string, public LastName: string) { }
	}
}
