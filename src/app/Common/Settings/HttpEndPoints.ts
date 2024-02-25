
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
		EditCourse: 'courses/{id}',
		AddCourse: 'courses',
	}

	public static Classes = {
		JoinClass: 'class/join/{classId}',
		AddClass: 'class',
		EditClass: 'class/{id}',
	}

	public static Email = {
		EmailSender: 'emailSender/send-welcome',

	}

	public static Profile = {
		GetInfo: 'account/info',
		EditInfo: 'account/edit'
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
