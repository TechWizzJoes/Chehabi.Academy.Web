import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';

import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { TranslateModule } from '@ngx-translate/core';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';

@Component({
	standalone: true,
	templateUrl: './Faq.html',
	styleUrls: ['Faq.scss'],
	imports: [FormsModule, RouterModule, CommonModule, TranslateModule]
})
export class FaqComponent implements OnInit {
	RoutePaths = RoutePaths;

	faqs = [
		{
			question: 'Faq.questions.q1',
			answer: 'Faq.questions.a1'
		},
		{
			question: 'Faq.questions.q2',
			answer: 'Faq.questions.a2'
		},
		{
			question: 'Faq.questions.q3',
			answer: 'Faq.questions.a3'
		},
		{
			question: 'Faq.questions.q4',
			answer: 'Faq.questions.a4'
		},
		{
			question: 'Faq.questions.q5',
			answer: 'Faq.questions.a5'
		},
		{
			question: 'Faq.questions.q6',
			answer: 'Faq.questions.a6'
		},
		{
			question: 'Faq.questions.q7',
			answer: 'Faq.questions.a7'
		},
		{
			question: 'Faq.questions.q8',
			answer: 'Faq.questions.a8'
		},
		{
			question: 'Faq.questions.q9',
			answer: 'Faq.questions.a9'
		}
	];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService,
	) { }

	ngOnInit() { }
}
