export namespace AuthModels {
	export class LoginReqModel {}

	export class RefreshTokenReqModel {}

	export class CurrentUserResModel {}

	export class ExtensionPasswordResModel {}

	export class LoginResModel {
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
		constructor(public Email: string, public Password: string) {}
	}
}
