import { Component, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { Feedback } from '../Feedback';

@Component({
	standalone: true,
	templateUrl: './FeedbackCard.html',
	styleUrls: ['FeedbackCard.scss'],
	selector: 'app-feedback-card',
	imports: [FormsModule, CommonModule, RouterModule]
})
export class FeedbackCardComponent implements OnInit {
	@Input('Feedback') Feedback!: Feedback;

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
