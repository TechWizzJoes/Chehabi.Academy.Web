import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { UserModels } from '@App/Common/Models/User.Models';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPropertyEnum } from '@App/Common/Enums/ModalProperties.Enum';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { StarRatingComponent } from '@App/Common/Widgets/StarRating/StarRating';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Constants } from '@App/Common/Settings/Constants';
import { FeedbackModels } from '@App/Common/Models/Feedback.Models';
import { FeedbackModalComponent } from './FeedBackModal/FeedBackModal';

@Component({
    standalone: true,
    templateUrl: './Classes.html',
    styleUrls: ['Classes.scss'],
    imports: [FormsModule, CommonModule, RouterModule, LoaderComponent, StarRatingComponent, TranslateModule],
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
export class ClassesComponent implements OnInit {
    Constants = Constants;
    RoutePaths = RoutePaths;
    IsLoaded: boolean = false;
    UserClasses: UserModels.UserClass[] = [];
    ModalPropertyEnum = ModalPropertyEnum;
    CurrentUser!: AuthModels.CurrentUserResModel;
    CurrentRating: number = 0;
    UserRatings: { [key: number]: FeedbackModels.Feedback; } = {};

    Today: Date = new Date()
    constructor(
        private Router: Router,
        private ActivatedRoute: ActivatedRoute,
        private HttpService: HttpService,
        private ErrorCodesService: ErrorCodesService,
        private NotifyService: NotifyService,
        private AuthService: AuthService,
        private StorageService: StorageService,
        private modalService: NgbModal
    ) {
        this.CurrentUser = this.AuthService.CurrentUser;
    }

    ngOnInit() {
        this.getUserClasses();
        this.getUserRatings();
    }

    getUserClasses() {
        let endPoint = HttpEndPoints.Classes.GetAllByUser
        this.HttpService.Get<UserModels.UserClass[]>(endPoint).subscribe(data => {
            this.IsLoaded = true
            this.UserClasses = data;
        })
    }

    getUserRatings() {
        let endPoint = HttpEndPoints.Feedback.GetAllByUser;
        endPoint = endPoint.replace('{id}', this.CurrentUser.Id.toString());
        this.HttpService.Get<FeedbackModels.Feedback[]>(endPoint)
            .subscribe(data => {
                this.UserRatings = data.reduce((acc, item) => {
                    acc[item.CourseId ?? 0] = item;
                    return acc;
                }, {} as { [key: number]: FeedbackModels.Feedback });
            });
    }

    showSessions(event: Event, index: number) {
        event.stopPropagation()
        this.UserClasses[index].Class.ShowSessions = !this.UserClasses[index].Class.ShowSessions;
    }

    getCourseRating(courseId: number): number {
        return this.UserRatings[courseId]?.Rating ?? 0;
    }

    openFeedbackModal(feedback: FeedbackModels.Feedback, courseId: number, paid: boolean) {
        if (!paid) {
            this.NotifyService.Info("You must be fully enrolled to leave a rating.");
            return;
        }
        const modalRef = this.modalService.open(FeedbackModalComponent, { centered: true });
        modalRef.componentInstance.isEdit = !!feedback;
        if (feedback) modalRef.componentInstance.feedback = feedback;
        else modalRef.componentInstance.courseId = courseId;

        modalRef.closed.subscribe((data) => {
            if (data == 'save') {
                this.getUserRatings();
            }
        })
    }
}