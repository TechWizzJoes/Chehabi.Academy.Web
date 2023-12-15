
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
		Material: 'courses/material/{id}',
	}

	public static Classes = {
		JoinClass: 'class/join/{classId}',
	}

	public static Email = {
		EmailSender: 'emailSender/send-welcome',

	}

	public static Profile = {
		getInfo: 'account/info',

	}

	public static Notifications = {
		Subscribe: 'notifications/subscribe',
		Publish: 'notifications/publish',
	}

	public static WhatsNew = {
		GetAll: 'whatsnew/list/all',
	}

	public static Feeback = {
		GetAll: 'feedback/list/all',
	}
}
