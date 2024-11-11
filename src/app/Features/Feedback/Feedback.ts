import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FeedbackCardComponent } from './FeedbackCard/FeedbackCard';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { FeedbackModels } from '@App/Common/Models/Feedback.Models';
import { TranslateModule } from '@ngx-translate/core';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';

@Component({
	standalone: true,
	templateUrl: './Feedback.html',
	styleUrls: ['Feedback.scss'],
	imports: [FormsModule, CommonModule, RouterModule, NgxChartsModule, FeedbackCardComponent, TranslateModule]
})
export class FeedbackComponent implements OnInit {
	RoutePaths = RoutePaths;
	Feedbacks: FeedbackModels.Feedback[] = []

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
		this.getFeedbacks()
	}

	scrollToTarget() {
		document.getElementById('feedbacks')!.scrollIntoView()
	}

	getFeedbacks() {
		let endPoint = HttpEndPoints.Feedback.GetAll;
		this.HttpService.Get<FeedbackModels.Feedback[]>(endPoint).subscribe(data => {
			this.Feedbacks = data;
		})
	}
}
