import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageEnum, StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { StarRatingComponent } from '@App/Common/Widgets/StarRating/StarRating';
import { Constants } from '@App/Common/Settings/Constants';
import { DirectivesModule } from '@App/Common/Directives/Directives.Module';
import { TranslateModule } from '@ngx-translate/core';

import { CourseTypeEnum } from '@App/Common/Enums/CourseType.Enum';
import { CourseLevelEnum } from '@App/Common/Enums/CourseLevel.Enum';
import { CourseLanguageEnum } from '@App/Common/Enums/CourseLanguage.Enum';

@Component({
	standalone: true,
	templateUrl: './CourseFilter.html',
	styleUrls: ['CourseFilter.scss'],
	selector: 'app-course-filter',
	imports: [FormsModule, CommonModule, RouterModule, StarRatingComponent, DirectivesModule, TranslateModule]
})
export class CourseFilterComponent implements OnInit {

	@Input() Filter!: CourseModels.Filter;
	@Output() FilterChange = new EventEmitter<CourseModels.Filter>();


	courseTypes = Object.keys(CourseTypeEnum);
	courseTypesValues = Object.values(CourseTypeEnum);

	CourseLevels = Object.keys(CourseLevelEnum);
	CourseLevelsValues = Object.values(CourseLevelEnum);

	CourseLanguages = Object.keys(CourseLanguageEnum);
	CourseLanguagesValues = Object.values(CourseLanguageEnum);

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

	Data = {
		FilterRows: () => {
			this.Filter.Time = new Date();
			this.StorageService.SetLocalStorage(StorageEnum.CoursesFilter, this.Filter);
			this.FilterChange.emit({ ...this.Filter });
		},

		ResetFilter: () => {
			this.Filter = new CourseModels.Filter();
			this.StorageService.RemoveLocalStorage(StorageEnum.CoursesFilter);
			this.FilterChange.emit({ ...this.Filter });
		}
	}
}
