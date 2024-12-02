export enum ErrorCodesEnum {
	USER_NOT_FOUND = 'Incorrect email or password',
	WRONG_PASSWORD = 'Incorrect email or password',
	UNEXPECTED_ERROR_OCCURED = 'Unexpected error occured',
	FILL_REQUIRED_FIELDS = 'Please Fill Required Fields',
	FALSE_GOOGLE_LOGIN = 'Incorrect google login',
	INTERNAL_SERVER_ERROR = 'unexpected error happened!',
	MAX_CLASS_USERS = 'Sorry this class is currently full',
	USER_EXISTS_CLASS = 'You already joined this class',
	USER_EXISTS_COURSE = 'You already joined this course in another active class',
	PASSWORD_NOT_MATCH = 'Passwords do not match',
	COURSE_STARTDATE_EXCEEDED = 'Course start date can\'t exceed its classes start dates! \n you can change the classes dates first.',
	COURSE_STARTDATE_BEFORE_TODAY = 'Course start date can\'t be before Today\'s date.',
	Class_STARTDATE_BEFORE_TODAY = 'Class start date can\'t be before Today\'s date.',
	CLASS_BEFORE_COURSE = 'Class starts before the course starting date.',
	SESSION_BEFORE_CLASS = 'Sessions start before the class starting date.',
	CLASS_INACTIVE = 'Class is currently inactive.',
	CLASS_DELETED = 'Class is deleted!',
	CLASS_Started = 'Class has already started.',
	CLASS_HAS_NO_FREETRIAL = 'This class doesn\'t have a free trial!',
	COURSE_NOT_PAID_TO_RATE = 'You must be fully enrolled to leave a rating.',
	INVALID_COURSE_TYPE = 'invalid course type id',
	INVALID_COURSE_LEVEL = 'invalid course level id',

	USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
	COURSE_NOT_FOUND = 'COURSE_NOT_FOUND',

	STRIPE_WEBHOOK_ERROR = 'STRIPE_WEBHOOK_ERROR',

	//Notification template error
	EMAIL_NOT_Sent = 'Email not sent:',
	Invalid_Notification_Type = 'Invalid notification type',
	Template_Not_Found = 'Template not found',
	USER_NOT_CREATOR = 'USER_NOT_CREATOR',
	USER_NOT_ADMIN = 'USER_NOT_ADMIN'

}
