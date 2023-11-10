
export class HttpEndPoints {

	public static Account = {
		Login: 'account/login',
		SocialLogin: {
			Google: 'account/google-login'
		},
		Register: 'account/register',
		Refresh: 'account/refresh',
	}

	public static Courses = {
		GetOne: 'courses/{id}',
		GetAll: 'courses/list/all',

	}
}
