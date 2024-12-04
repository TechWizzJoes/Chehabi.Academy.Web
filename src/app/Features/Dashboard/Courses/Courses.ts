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
import { CourseLevelEnum } from '@App/Common/Enums/CourseLevel.Enum';

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
        this.getAdminCourses();

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

    editCourse(course: CourseModels.Course) {
        let endPoint = HttpEndPoints.Courses.EditCourse;
        endPoint = endPoint.replace('{id}', course.Id.toString())
        this.HttpService.Put<CourseModels.Course>(endPoint, course).subscribe(data => {
        })
    }

}