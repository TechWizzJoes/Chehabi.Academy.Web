
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
		GetOneForPublic: 'courses/public/{id}',
		GetAll: 'courses/list/all',
		GetAllByAdmin: 'courses/admin/courses',
		EditCourse: 'courses/{id}',
		DeleteCourse: 'courses/{id}',
		UploadImage: 'courses/upload/image/{id}',
		Uploadfile: 'courses/upload/file/{id}?IsSample={IsSample}',
		AddCourse: 'courses',
	}

	public static Classes = {
		GetOne: 'class/{id}',
		JoinFreeTrial: 'class/join-free-trial/{classId}',
		GetAllByUser: 'class/user/classes',
		AddClass: 'class',
		EditClass: 'class/{id}',
		DeleteClass: 'class/{id}',
	}

	public static Sessions = {
		GetUpcoming: 'session/list/upcoming',
	}

	public static Email = {
		EmailSender: 'emailSender/send-welcome',

	}

	public static Profile = {
		GetProfile: 'user',
		EditProfile: 'user',
		EditPreference: 'user/preference',
		UploadImage: 'user/upload/image/{id}',
	}

	public static Notifications = {
		Subscribe: 'notifications/subscribe',
		Publish: 'notifications/publish',
		GetInApp: 'notifications/in-app?isRead={isRead}',
	}

	public static WhatsNew = {
		GetAll: 'whatsnew/list/all',
	}

	public static Payment = {
		Checkout: 'payment/checkout',
	}

	public static Cart = {
		Get: 'cart',
		AddItem: 'cart/add',
		RemoveItem: 'cart/remove/{id}',
		Checkout: 'cart/checkout',
	}

	public static Feedback = {
		GetAll: 'feedback/list/all',
		addRating: 'feedback',
		GetCourseRating: 'feedback/course/:courseId/user',
		GetAllByUser: 'feedback/user/{id}'
	}

	public static Contact = {
		Add: 'contact-us',
	}
}
