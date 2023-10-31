export namespace AuthModels {
	export class LoginReqModel {
		Email!: string;
		Password!: string;
	}

	export class GoogleLoginReqModel {
		IdToken!: string
	}
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
		FirstName!: string;
		LastName!: string;
		Email!: string;
		IsAdmin!: boolean;
		ProfilePicturePath?: string;
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
