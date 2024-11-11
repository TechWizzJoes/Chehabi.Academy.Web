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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsModalComponent } from '../DetailsModal/DetailsModal';
import { ModalPropertyEnum } from '@App/Common/Enums/ModalProperties.Enum';
import { PipesModule } from '@App/Common/Pipes/Pipes.Module';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { TranslateModule } from '@ngx-translate/core';
import { Constants } from '@App/Common/Settings/Constants';

@Component({
    standalone: true,
    templateUrl: './CourseDetails.html',
    styleUrls: ['CourseDetails.scss'],
    imports: [FormsModule, CommonModule, NgxChartsModule, LoaderComponent, PipesModule, RouterModule, TranslateModule]
})
export class CourseDetailsComponent implements OnInit {
    RoutePaths = RoutePaths;
    Constants = Constants;
    IsLoaded: boolean = false;
    Course: CourseModels.Course = new CourseModels.Course();
    LastUpdated: string = '';
    ModalPropertyEnum = ModalPropertyEnum;
    ClassesCounter: any = { start: 0, end: 3 };
    UpcomingSessions: any[] = [];
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
        this.ActivatedRoute.params.subscribe((params) => {
            const id = (params['id']);
            this.getCourse(id);
        });
    }

    openEditModal(property: ModalPropertyEnum, index?: string, isEdit: boolean = true) {
        const modalRef = this.modalService.open(DetailsModalComponent, { centered: true, modalDialogClass: 'course-modal' });
        modalRef.componentInstance.property = property;
        modalRef.componentInstance.course = this.Course;
        modalRef.componentInstance.isEdit = isEdit;

        if (index) {
            modalRef.componentInstance.index = index;
        }

        modalRef.closed.subscribe((data) => {
            if (data == 'save') {
                this.getCourse(this.Course.Id.toString());

            } else if (data == 'delete') {
                this.Router.navigate([RoutePaths.Dashboard, RoutePaths.Courses])
            }
        })
    }

    getCourse(id: string) {
        let endPoint = HttpEndPoints.Courses.GetOne;
        endPoint = endPoint.replace('{id}', id)
        this.HttpService.Get<CourseModels.Course>(endPoint).subscribe(data => {
            this.IsLoaded = true
            this.Course = data;
            this.Course.ImageUrl = data.ImageUrl;
            this.getUpcomingSessions();
        })
    }

    getClasses() {
        this.ClassesCounter.end += 3;
    }

    getUpcomingSessions() {
        if (this.Course.IsActive) {
            this.Course.Classes.forEach((cls) => {
                let today = new Date().toDateString();
                if (cls.IsActive && today >= cls.StartDate && cls.EndDate >= today) {
                    if (cls.CurrentIndex == 0) {
                        this.UpcomingSessions.push({ class: cls.Id.toString(), date: cls.StartDate })
                    } else {
                        let nextSession = cls.CurrentIndex * 7;
                        let nextSessionDate = new Date(cls.StartDate);
                        nextSessionDate.setDate(nextSessionDate.getDate() + nextSession);
                        this.UpcomingSessions.push({ class: cls.Id.toString(), date: cls.StartDate })
                    }
                }
            })
        }
    }

    downloadMaterial(fileUrl: string) {
        this.HttpService.DownloadFile(fileUrl + '/true');
    }
}
