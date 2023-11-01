import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { CourseCardComponent } from './CourseCard/CourseCard';

export class Course {
	Id!: number;
	Name!: string;
	Description!: string;
}

@Component({
	standalone: true,
	templateUrl: './CoursesList.html',
	styleUrls: ['CoursesList.scss'],
	imports: [FormsModule, CommonModule, CourseCardComponent]
})
export class CoursesListComponent implements OnInit {

	Courses: Course[] = [
		{ Id: 1, Name: 'course 1', Description: 'lorwndcmldsljs kcsmcks' },
		{ Id: 2, Name: 'course 2', Description: 'kljnbahcd vyabsnkj' },
		{ Id: 3, Name: 'course 3', Description: 'lorwndcmldsljs kcsmcks' },
		{ Id: 4, Name: 'course 4', Description: 'lorwndcmldsljs kcsmcks' },
		{ Id: 5, Name: 'course 5', Description: 'lorwndcmldsljs kcsmcks' },
	]
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService
	) { }

	ngOnInit() {
	}
}
