import { Component, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { Course } from '../CoursesList';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	standalone: true,
	templateUrl: './CourseCard.html',
	styleUrls: ['CourseCard.scss'],
	selector: 'app-course-card',
	imports: [FormsModule, CommonModule, RouterModule, NgbRatingModule]
})
export class CourseCardComponent implements OnInit {
	@Input('Course') Course!: Course;
	RoutePaths = RoutePaths

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService
	) { }

	ngOnInit() { }

	GotoCourse(id: number) {
		this.router.navigate(['/', RoutePaths.Course, id.toString()])
	}
}
