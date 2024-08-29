import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { CourseModels } from '@App/Common/Models/Course.Models';
import { UserModels } from '@App/Common/Models/User.Models';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsModalComponent } from '../DetailsModal/DetailsModal';
import { ModalPropertyEnum } from '@App/Common/Enums/ModalProperties.Enum';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { StarRatingComponent } from '@App/Common/Widgets/StarRating/StarRating';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Constants } from '@App/Common/Settings/Constants';
import { RatingModels } from '@App/Common/Models/Rating.Models';

@Component({
    standalone: true,
    templateUrl: './Courses.html',
    styleUrls: ['Courses.scss'],
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
export class CoursesComponent implements OnInit {
    Constants = Constants;
    IsLoaded: boolean = false;
    Courses: CourseModels.Course[] = [];
    ClassesByUser: CourseModels.Class[] = [];
    ModalPropertyEnum = ModalPropertyEnum;
    CurrentUser!: AuthModels.CurrentUserResModel;
    CurrentRating: number = 0;
    RatingReadOnly: boolean = false;
    UserRatings: RatingModels.Rating[] = [];
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
        if (this.CurrentUser.IsAdmin) {
            this.getAdminCourses();
        } else {
            this.getUserClasses();
            this.getUserRatings();
        }
    }

    gotoCourse(id: number) {
        this.Router.navigate(['/', RoutePaths.Dashboard, RoutePaths.Courses, id.toString()])
    }

    openModal(property: ModalPropertyEnum, isEdit: boolean = false) {
        const modalRef = this.modalService.open(DetailsModalComponent, { centered: true, modalDialogClass: 'course-modal' });
        modalRef.componentInstance.property = property;
        modalRef.componentInstance.isEdit = isEdit;

        modalRef.closed.subscribe((data) => {
            if (data == 'save') {
                this.getAdminCourses();
            }
        })
    }

    getAdminCourses() {
        let endPoint = HttpEndPoints.Courses.GetAllByAdmin
        this.HttpService.Get<CourseModels.Course[]>(endPoint).subscribe(data => {
            this.IsLoaded = true
            this.Courses = data;
        })
    }

    getUserClasses() {
        let endPoint = HttpEndPoints.Classes.GetAllByUser
        this.HttpService.Get<CourseModels.Class[]>(endPoint).subscribe(data => {
            this.IsLoaded = true
            this.ClassesByUser = data;
        })
    }

    getUserRatings() {
        let endPoint = HttpEndPoints.Rating.GetAllByUser;
        endPoint = endPoint.replace('{id}', this.CurrentUser.Id.toString());
        this.HttpService.Get<RatingModels.Rating[]>(endPoint)
            .subscribe(data => {
                this.UserRatings = data;
            });
    }

    getRatingForCourse(courseId: number): number {
        if (this.UserRatings.length === 0) {
            return 0;
        }
        const rating = this.UserRatings.find(r => r.CourseId === courseId);
        return rating ? rating.Rating : 0;
    }
    // changeRating(event: Event, course: CourseModels.Course, index: number) {
    //     event.stopPropagation();
    //     event.preventDefault();
    //     course.Rating = index;
    //     this.editCourse(course);
    // }

    onRateChange(newRating: number, courseId: number) {
        this.CurrentRating = newRating;
        // console.log(newRating);
        // console.log(courseId);

        this.updateRating(newRating, courseId);
    }

    updateRating(newRating: number, courseId: number) {
        const endpoint = HttpEndPoints.Rating.addRating;

        const rating: RatingModels.Rating = {
            CourseId: courseId, // Assuming that CourseId and UserId are objects with Id properties
            UserId: this.CurrentUser.Id,
            Rating: newRating

        } as RatingModels.Rating;
        this.HttpService.Post<RatingModels.Rating, RatingModels.Rating>(endpoint, rating)
            .subscribe({
                next: data => {
                    this.NotifyService.Success("Success", "Thank For Your Rating");
                },
                error: error => {
                    this.NotifyService.Error('Error', 'Try Rating Again Later')
                }
            });
    }
    editCourse(course: CourseModels.Course) {
        let endPoint = HttpEndPoints.Courses.EditCourse;
        endPoint = endPoint.replace('{id}', course.Id.toString())
        this.HttpService.Put<CourseModels.Course>(endPoint, course).subscribe(data => {
        })
    }



    showSessions(event: Event, index: number) {
        event.stopPropagation()
        this.ClassesByUser[index].ShowSessions = !this.ClassesByUser[index].ShowSessions;
    }

    formatDate(dateString: Date, gmtOffset?: number): string {
        // Parse the date string
        const date = new Date(dateString);

        // Adjust the time to your local timezone based on the GMT offset (in hours)
        // const localDate = new Date(date.getTime() + gmtOffset * 60 * 60 * 1000);
        const localDate = new Date(date.getTime());

        // Format the date to "Tuesday 20/08/2024 02:00 pm"
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',    // Full weekday name
            year: 'numeric',    // Full year
            month: '2-digit',   // Month as two digits
            day: '2-digit',     // Day as two digits
            hour: '2-digit',    // Hour in 12-hour format
            minute: '2-digit',  // Minutes as two digits
            hour12: true        // 12-hour format with AM/PM
        };

        return new Intl.DateTimeFormat('en-GB', options).format(localDate);
    }
}