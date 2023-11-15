
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

	public static Email = {
		EmailSender: 'EmailSender/send-welcome',

	}

	public static Profile = {
		getInfo: 'account/info',

	}
	public static Notifications = {
		Subscribe: 'notifications/subscribe',
		Publish: 'notifications/publish',

	}
}
