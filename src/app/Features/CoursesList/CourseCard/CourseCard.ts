import { Component, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { StarRatingComponent } from '@App/Common/Widgets/StarRating/StarRating';
import { Constants } from '@App/Common/Settings/Constants';

@Component({
	standalone: true,
	templateUrl: './CourseCard.html',
	styleUrls: ['CourseCard.scss'],
	selector: 'app-course-card',
	imports: [FormsModule, CommonModule, RouterModule, StarRatingComponent]
})
export class CourseCardComponent implements OnInit {
	Constants = Constants;
	@Input('Course') Course!: CourseModels.Course;

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


}
