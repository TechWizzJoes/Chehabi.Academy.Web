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

// export class Feedback {
// 	Id!: number;
// 	Name!: string;
// 	Paragraph!: string;
// 	ImageUrl!: string
// }

@Component({
	standalone: true,
	templateUrl: './Feedback.html',
	styleUrls: ['Feedback.scss'],
	imports: [FormsModule, CommonModule, RouterModule, NgxChartsModule, FeedbackCardComponent, TranslateModule]
})
export class FeedbackComponent implements OnInit {

	Feedbacks: FeedbackModels.Feedback[] = [
		// { Id: 1, Name: 'Sarah Müller', Paragraph: "Chehabi Academy has been an incredible place to learn Arabic. As a student in Germany, I was looking for a convenient and effective way to improve my Arabic language skills. The courses at Chehabi Academy not only met but exceeded my expectations. The dedicated instructors, interactive lessons, and the supportive community made my learning experience enjoyable and fruitful. I highly recommend Chehabi Academy to anyone looking to master the Arabic language.", ImageUrl: 'assets/courses/c1.jpeg' },
		// { Id: 2, Name: 'Ahmed Fischer', Paragraph: "I cannot express how grateful I am to have found Chehabi Academy. As an expatriate in Germany, I needed to learn Arabic for personal and professional reasons. The quality of instruction and the flexibility of the classes at Chehabi Academy are exceptional. The teachers are knowledgeable and patient, and the curriculum is well-structured. I've made significant progress in a short time, thanks to their guidance.I couldn't have chosen a better place to learn Arabic.", ImageUrl: 'assets/courses/c2.jpeg' },
		// { Id: 3, Name: 'Leila Schneider', Paragraph: "I had always wanted to learn Arabic, and Chehabi Academy made it possible. The academy's commitment to promoting Arabic language and culture is truly commendable.I enrolled in their beginner's course, and within a few months, I felt confident in speaking and understanding Arabic. The friendly atmosphere, cultural activities, and the dedication of the staff make Chehabi Academy a unique and enriching place to learn. I'm grateful for this wonderful learning journey.", ImageUrl: 'assets/courses/c3.jpeg' },
	]

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
		let endPoint = HttpEndPoints.Feeback.GetAll;
		this.HttpService.Get<FeedbackModels.Feedback[]>(endPoint).subscribe(data => {
			this.Feedbacks.push(...data)
		})
	}
}
