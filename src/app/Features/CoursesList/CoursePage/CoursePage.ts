import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { PipesModule } from '@App/Common/Pipes/Pipes.Module';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { StarRatingComponent } from '@App/Common/Widgets/StarRating/StarRating';
import { Constants } from '@App/Common/Settings/Constants';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '@App/Common/Services/cart.service';
import { CartModels } from '@App/Common/Models/Cart.Models';

@Component({
	standalone: true,
	templateUrl: './CoursePage.html',
	styleUrls: ['CoursePage.scss'],
	imports: [FormsModule, CommonModule, RouterModule, StarRatingComponent, LoaderComponent, PipesModule, TranslateModule],
	// animations: [
	// 	trigger('fadeInOut', [
	// 		state('void', style({ opacity: 0 })),
	// 		transition('void <=> *', animate(300)),
	// 	]),
	// ],
	animations: [
		trigger('fadeInOut', [
			state('void', style({ opacity: 0, height: '0' })),
			transition('* => void', [
				// Animate opacity first, then height for the fade out effect
				animate(100, style({ opacity: 0 })),
				animate(100, style({ height: '0' }))
			]),
			transition('void => *', [
				// Animate height first, then opacity for the fade in effect
				animate(100, style({ height: '*' })),
				animate(300, style({ opacity: 1 })),
			])
		]),
	],
})
export class CoursePageComponent implements OnInit {
	RoutePaths = RoutePaths;
	Constants = Constants;
	Course!: CourseModels.Course;
	// Sessions!: CourseModels.LiveSession;

	IsLoaded: boolean = false;
	IsJoinClass!: boolean;
	SelectedClass?: CourseModels.Class;

	constructor(
		private Router: Router,
		private ActivatedRoute: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService,
		private CartService: CartService,
	) { }

	ngOnInit() {
		this.ActivatedRoute.params.subscribe((params) => {
			const id = (params['id']);
			this.getCourse(id);
		});
	}

	SelectClass(selectedClass: CourseModels.Class) {
		if (!this.SelectedClass) {
			this.SelectedClass = selectedClass;
		} else {
			if (this.SelectedClass.Id == selectedClass.Id) {
				this.SelectedClass = undefined;
			} else {
				this.SelectedClass = selectedClass;

			}
		}
	}

	showSessions(event: Event, index: number) {
		event.stopPropagation()
		this.Course.Classes[index].ShowSessions = !this.Course.Classes[index].ShowSessions;
	}


	getCourse(id: string) {
		let endPoint = HttpEndPoints.Courses.GetOneForPublic;
		endPoint = endPoint.replace('{id}', id);
		this.HttpService.Get<CourseModels.Course>(endPoint).subscribe(data => {
			this.IsLoaded = true;
			this.Course = data;
			this.Course.Classes.forEach(c => {
				c.AvailableSlots = c.MaxCapacity - c.UserClasses.length;
			})
		})
	}

	JoinClass() {
		if (this.AuthService.IsAuthenticated) {

			this.IsJoinClass! = true
			return
		}

		this.Router.navigate(['login'], { queryParams: { returnUrl: this.Router.url } });

	}

	JoinFreeTrial() {
		if (!this.SelectedClass) return;
		let endPoint = HttpEndPoints.Classes.JoinFreeTrial;
		endPoint = endPoint.replace('{classId}', this.SelectedClass.Id.toString());
		this.HttpService.Post<any, any>(endPoint, {}).subscribe(data => {
			// this.IsLoaded = true
			// this.Course = data
			console.log(data);
			this.NotifyService.Success("Congratulations! You've joined this course's free trial and will be eligible to the first session.")
		})
	}

	AddToCart() {
		if (!this.SelectedClass) return;
		let newCartItem = new CartModels.CartItem();
		newCartItem.ClassId = this.SelectedClass.Id;
		this.CartService.addToCart(newCartItem).then(() => {
			this.NotifyService.Success(`${this.SelectedClass!.Name} class is added to your cart!`);
		});
	}

	DownloadMaterial() {
		// download
	}
}
