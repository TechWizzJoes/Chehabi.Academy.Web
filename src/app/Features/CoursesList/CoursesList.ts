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
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';

export class Course {
	Id!: number;
	Name!: string;
	Description!: string;
	ImageUrl!: string;
	Instructor!: string;
	Rating!: number;
	Raters!: number;
	Price!: string;

	VideoPath!: string;
	FilePath!: string;
	IsActive!: boolean;
	IsDeleted!: boolean;
}

@Component({
	standalone: true,
	templateUrl: './CoursesList.html',
	styleUrls: ['CoursesList.scss'],
	imports: [FormsModule, CommonModule, CourseCardComponent, LoaderComponent]
})
export class CoursesListComponent implements OnInit {

	Courses!: Course[]
	IsLoaded: boolean = false;
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

	ngOnInit() {
		let endPoint = HttpEndPoints.Courses.GetAll
		this.HttpService.Get<Course[]>(endPoint).subscribe(data => {
			this.IsLoaded = true
			this.Courses = data
		})
	}

	GotoCourse(id: number) {
		this.router.navigate(['/', RoutePaths.Course, id.toString()])
	}
}

