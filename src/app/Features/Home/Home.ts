import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageEnum, StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';

import { TranslateModule } from '@ngx-translate/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { LaptopComponent } from './Laptop/Laptop';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { WhatsNewModels } from '@App/Common/Models/WhatsNew.Models';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { FeedbackModels } from '@App/Common/Models/Feedback.Models';
import { FeedbackCardComponent } from '../Feedback/FeedbackCard/FeedbackCard';
import { DirectivesModule } from '@App/Common/Directives/Directives.Module';

@Component({
	standalone: true,
	templateUrl: './Home.html',
	styleUrls: ['Home.scss'],
	imports: [
		FormsModule,
		CommonModule,
		RouterModule,
		TranslateModule,
		NgbCarouselModule,
		// LaptopComponent,
		FeedbackCardComponent,
		DirectivesModule
	]
})
export class HomeComponent implements OnInit {
	RoutePaths = RoutePaths
	courseSearchText!: string;
	WhatsNew!: WhatsNewModels.WhatsNew[];
	Feedbacks: FeedbackModels.Feedback[] = []

	steps = [
		{
			imgSrc: 'assets/Images/LaptopChoice.png',
			alt: 'Select a course and enroll',
			title: 'HomePage.howItWorks.step1_title',
			description: 'HomePage.howItWorks.step1_description',
		},
		{
			imgSrc: 'assets/Images/Login.png',
			alt: 'Select a course and enroll',
			title: 'HomePage.howItWorks.step2_title',
			description: 'HomePage.howItWorks.step2_description',
		},
		{
			imgSrc: 'assets/Images/freeTrial.png',
			alt: 'Select a course and enroll',
			title: 'HomePage.howItWorks.step3_title',
			description: 'HomePage.howItWorks.step3_description',
		},
		{
			imgSrc: 'assets/Images/Payment.png',
			alt: 'Select a course and enroll',
			title: 'HomePage.howItWorks.step4_title',
			description: 'HomePage.howItWorks.step4_description',
		},
		{
			imgSrc: 'assets/Images/StartLearning.png',
			alt: 'Select a course and enroll',
			title: 'HomePage.howItWorks.step5_title',
			description: 'HomePage.howItWorks.step5_description',
		},
	];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService
	) {
		window.addEventListener("scroll", function () {
			const page = document.querySelector("#home-page");
			if (window.scrollY > 56) {
				page?.classList.add("page-scrolled");
			} else {
				page?.classList.remove("page-scrolled");
			}
		});
	}

	ngOnInit() {
		// this.getWhatsNew()
		this.getFeedbacks();
	}

	// getWhatsNew() {
	// 	let endPoint = HttpEndPoints.WhatsNew.GetAll;
	// 	this.HttpService.Get<WhatsNewModels.WhatsNew[]>(endPoint).subscribe(data => {
	// 		console.log(data);

	// 		this.WhatsNew = data
	// 	})
	// }

	searchInCourses() {
		const filter = new CourseModels.Filter();
		filter.SearchInput = this.courseSearchText;
		this.StorageService.SetLocalStorage(StorageEnum.CoursesFilter, filter);
		this.router.navigate([RoutePaths.Courses])
	}

	getFeedbacks() {
		let endPoint = HttpEndPoints.Feedback.GetForHome.replace('{take}', '3');
		this.HttpService.Get<FeedbackModels.Feedback[]>(endPoint).subscribe(data => {
			this.Feedbacks = data;
		})
	}
}
