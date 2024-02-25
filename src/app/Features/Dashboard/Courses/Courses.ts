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

@Component({
    standalone: true,
    templateUrl: './Courses.html',
    styleUrls: ['Courses.scss'],
    imports: [FormsModule, CommonModule, RouterModule, LoaderComponent]
})
export class CoursesComponent implements OnInit {
    IsLoaded: boolean = false;
    Courses: CourseModels.Course[] = [];
    ModalPropertyEnum = ModalPropertyEnum;

    constructor(
        private Router: Router,
        private ActivatedRoute: ActivatedRoute,
        private HttpService: HttpService,
        private ErrorCodesService: ErrorCodesService,
        private NotifyService: NotifyService,
        private AuthService: AuthService,
        private StorageService: StorageService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.getCourses();
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
                this.getCourses();
            }
        })
    }

    getCourses() {
        let endPoint = HttpEndPoints.Courses.GetAll
        this.HttpService.Get<CourseModels.Course[]>(endPoint).subscribe(data => {
            this.IsLoaded = true
            this.Courses = data
        })
    }

}