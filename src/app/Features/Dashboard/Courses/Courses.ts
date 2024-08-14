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

@Component({
    standalone: true,
    templateUrl: './Courses.html',
    styleUrls: ['Courses.scss'],
    imports: [FormsModule, CommonModule, RouterModule, LoaderComponent]
})
export class CoursesComponent implements OnInit {
    IsLoaded: boolean = false;
    Courses: CourseModels.Course[] = [];
    ClassesByUser: CourseModels.Class[] = [];
    MaxRating: number = 5;
    ModalPropertyEnum = ModalPropertyEnum;
    CurrentUser!: AuthModels.CurrentUserResModel;

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
        this.getUserClasses();
    }

    gotoCourse(id: number) {
        this.Router.navigate(['/', RoutePaths.Dashboard, RoutePaths.Courses, id.toString()])
    }

    getInitials(instructor: UserModels.User): string {
        let initials = instructor.FirstName[0].toUpperCase() + instructor.LastName[0].toUpperCase();
        return initials;
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
        let endPoint = HttpEndPoints.Courses.GetAllByUser
        this.HttpService.Get<CourseModels.Class[]>(endPoint).subscribe(data => {
            this.IsLoaded = true
            this.ClassesByUser = data;
        })
    }

    changeRating(event: Event, course: CourseModels.Course, index: number) {
        event.stopPropagation();
        event.preventDefault();
        course.Rating = index;
        this.editCourse(course);
    }

    editCourse(course: CourseModels.Course) {
        let endPoint = HttpEndPoints.Courses.EditCourse;
        endPoint = endPoint.replace('{id}', course.Id.toString())
        this.HttpService.Put<CourseModels.Course>(endPoint, course).subscribe(data => {
        })
    }


}