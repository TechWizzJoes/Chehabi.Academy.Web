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
import { TranslateModule } from '@ngx-translate/core';
import { CourseFilterComponent } from './CourseFilter/CourseFilter';

@Component({
	standalone: true,
	templateUrl: './CoursesList.html',
	styleUrls: ['CoursesList.scss'],
	imports: [FormsModule, CommonModule, CourseCardComponent, LoaderComponent, TranslateModule, CourseFilterComponent]
})
export class CoursesListComponent implements OnInit {
	RoutePaths = RoutePaths

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
			this.Data.CheckFilter();
			let endPoint = HttpEndPoints.Courses.GetAll
			this.HttpService.Post<CourseModels.Filter, CourseModels.Course[]>(endPoint, this.Filter).subscribe(data => {
				this.IsLoaded = true
				this.Courses = data
			})
		},

		CheckFilter: () => {
			if (!this.Filter) {
				this.Filter = this.StorageService.GetLocalStorage<CourseModels.Filter>(StorageEnum.CoursesFilter);

				if (Object.keys(this.Filter).length == 0) {
					// no filter in storage
					this.Filter = new CourseModels.Filter();
				} else {
					const now = new Date();
					const diffInMinutes = now.getMinutes() - (new Date(this.Filter.Time)).getMinutes()
					if (diffInMinutes > 5) {
						// reset filter after 5 minutes
						this.Filter = new CourseModels.Filter();
						this.StorageService.RemoveLocalStorage(StorageEnum.CoursesFilter);
					}
				}
			}
		},

		ChangeSort: () => {
			this.StorageService.SetLocalStorage(StorageEnum.CoursesFilter, this.Filter);
			this.Data.GetCourses();
		}
	}



}

