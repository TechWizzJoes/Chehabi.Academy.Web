import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageEnum, StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { CourseCardComponent } from './CourseCard/CourseCard';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { CourseTypeEnum } from '@App/Common/Enums/CourseType.Enum';
import { StarRatingComponent } from '@App/Common/Widgets/StarRating/StarRating';
import { TranslateModule } from '@ngx-translate/core';


@Component({
	standalone: true,
	templateUrl: './CoursesList.html',
	styleUrls: ['CoursesList.scss'],
	imports: [FormsModule, CommonModule, CourseCardComponent, LoaderComponent, StarRatingComponent, TranslateModule]
})
export class CoursesListComponent implements OnInit {
	RoutePaths = RoutePaths
	courseTypes = Object.keys(CourseTypeEnum);
	courseTypesValues = Object.values(CourseTypeEnum);

	Filter!: CourseModels.Filter;
	Courses!: CourseModels.Course[]
	IsLoaded: boolean = false;

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
		this.Data.GetCourses();
	}

	GotoCourse(id: number) {
		this.router.navigate(['/', RoutePaths.Course, id.toString()])
	}

	Data = {
		GetCourses: () => {
			this.IsLoaded = false;
			// console.log(this.Filter);
			if (!this.Filter) {
				this.Filter = this.StorageService.GetLocalStorage<CourseModels.Filter>(StorageEnum.CoursesFilter);
				// no filter in storage
				if (Object.keys(this.Filter).length == 0) {
					this.Filter = new CourseModels.Filter();
					// console.log('get filter from code', this.Filter);
				} else {
					// console.log('get filter from storage', this.Filter);
				}
			}

			let endPoint = HttpEndPoints.Courses.GetAll
			this.HttpService.Post<CourseModels.Filter, CourseModels.Course[]>(endPoint, this.Filter).subscribe(data => {
				this.IsLoaded = true
				this.Courses = data
			})
		},

		FilterRows: () => {
			// console.log(this.Filter);
			this.StorageService.SetLocalStorage(StorageEnum.CoursesFilter, this.Filter);
			// console.log('saved filter so storage');
			this.Data.GetCourses();
		},

		ResetFilter: () => {
			this.Filter = new CourseModels.Filter();
			this.StorageService.RemoveLocalStorage(StorageEnum.CoursesFilter);
			this.Data.GetCourses();
		}
	}



}

