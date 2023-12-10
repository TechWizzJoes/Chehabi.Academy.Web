import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { PipesModule } from '@App/Common/Pipes/Pipes.Module';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
	standalone: true,
	templateUrl: './Course.html',
	styleUrls: ['Course.scss'],
	imports: [FormsModule, CommonModule, RouterModule, NgbRatingModule, LoaderComponent, PipesModule],
	// animations: [
	// 	trigger('fadeInOut', [
	// 		state('void', style({ opacity: 0 })),
	// 		transition('void <=> *', animate(300)),
	// 	]),
	// ],
	animations: [
		trigger('fadeInOut', [
			state('void', style({ opacity: 0, height: '0' })),
			transition('void <=> *', [
				animate(100, style({ height: '*' })),
				animate(300, style({ opacity: 1 })),
			]),
		]),
	],
})
export class CourseComponent implements OnInit {
	RoutePaths = RoutePaths
	Course!: CourseModels.Course;
	Occurances!: CourseModels.ClassOccurance;

	IsLoaded: boolean = false;
	IsJoinClass!: boolean;
	SelectedClass!: CourseModels.Class;

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
		this.HttpService.Get<CourseModels.Course>(endPoint).subscribe(data => {
			this.IsLoaded = true
			this.Course = data
			// this.Occurances = data.Classes
		})
	}

	JoinClass() {
		if (this.AuthService.IsAuthenticated) {

			this.IsJoinClass! = true
			return
		}
		console.log(this.Router.url);

		this.Router.navigate(['login'], { queryParams: { returnUrl: this.Router.url } });
	}

	JoinNow() {
		let endPoint = HttpEndPoints.Classes.JoinClass;
		endPoint = endPoint.replace('{classId}', this.SelectedClass.Id.toString())
		this.HttpService.Post<any, any>(endPoint, {}).subscribe(data => {
			// this.IsLoaded = true
			// this.Course = data
			// this.Occurances = data.Classes
			console.log(data);

			this.NotifyService.Success("Congratulations! You've joined this course.")
		})
	}

	SelectClass(selectedClass: CourseModels.Class) {
		this.SelectedClass = selectedClass
	}
}
