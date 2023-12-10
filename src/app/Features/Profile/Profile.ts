import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { CourseModels } from '@App/Common/Models/Course.Models';

@Component({
	standalone: true,
	templateUrl: './Profile.html',
	styleUrls: ['Profile.scss'],
	imports: [FormsModule, CommonModule, NgxChartsModule, LoaderComponent]
})
export class ProfileComponent implements OnInit {
	IsLoaded: boolean = false;
	data: any
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
		let endPoint = HttpEndPoints.Profile.getInfo
		this.HttpService.Get<CourseModels.Course[]>(endPoint).subscribe(data => {
			this.IsLoaded = true
			this.data = data
		})
	}
}
