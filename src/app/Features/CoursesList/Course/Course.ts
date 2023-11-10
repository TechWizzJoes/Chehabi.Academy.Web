import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { Course } from '../CoursesList';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { PipesModule } from '@App/Common/Pipes/Pipes.Module';

@Component({
	standalone: true,
	templateUrl: './Course.html',
	styleUrls: ['Course.scss'],
	imports: [FormsModule, CommonModule, RouterModule, NgbRatingModule, LoaderComponent, PipesModule]
})
export class CourseComponent implements OnInit {
	RoutePaths = RoutePaths
	Course!: Course;

	IsLoaded: boolean = false;

	constructor(
		private Router: Router,
		private ActivatedRoute: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService
	) { }

	ngOnInit() {
		this.ActivatedRoute.params.subscribe((params) => {
			const id = (params['id']);
			this.getCourse(id)
		});


	}

	getCourse(id: string) {
		let endPoint = HttpEndPoints.Courses.GetOne;
		endPoint = endPoint.replace('{id}', id)
		this.HttpService.Get<Course>(endPoint).subscribe(data => {
			this.IsLoaded = true
			this.Course = data
		})
	}
}
