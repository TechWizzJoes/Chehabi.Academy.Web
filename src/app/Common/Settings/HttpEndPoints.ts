
export class HttpEndPoints {

	public static Account = {
		Login: 'account/login',
		SocialLogin: {
			Google: 'account/google-login'
		},
		Register: 'account/register',
		Refresh: 'account/refresh',
		ResetPassword: 'account/reset-password',
	}

	public static Courses = {
		GetOne: 'courses/{id}',
		GetAll: 'courses/list/all',
		EditCourse: 'courses/{id}',
		DeleteCourse: 'courses/{id}',
		UploadImage: 'courses/upload/image/{id}',
		Uploadfile: 'courses/upload/file/{id}',
		AddCourse: 'courses',
	}

	public static Classes = {
		JoinClass: 'class/join/{classId}',
		AddClass: 'class',
		EditClass: 'class/{id}',
		DeleteClass: 'class/{id}',
	}

	public static Email = {
		EmailSender: 'emailSender/send-welcome',

	}

	public static Profile = {
		GetProfile: 'user/{id}',
		EditProfile: 'user',
		UploadImage: 'user/upload/image/{id}',
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
