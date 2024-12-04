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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsModalComponent } from '../DetailsModal/DetailsModal';
import { ModalPropertyEnum } from '@App/Common/Enums/ModalProperties.Enum';
import { PipesModule } from '@App/Common/Pipes/Pipes.Module';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { Constants } from '@App/Common/Settings/Constants';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    templateUrl: './ClassDetails.html',
    styleUrls: ['ClassDetails.scss'],
    imports: [FormsModule, CommonModule, LoaderComponent, PipesModule, RouterModule, TranslateModule]
})
export class ClassDetailsComponent implements OnInit {
    RoutePaths = RoutePaths;
    Constants = Constants;
    ModalPropertyEnum = ModalPropertyEnum;

    IsLoaded: boolean = false;
    Class: CourseModels.Class = new CourseModels.Class();
    UsersCounter: any = { start: 0, end: 3 };

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
            this.GetClass(id);
        });
    }

    GetClass(id: string) {
        let endPoint = HttpEndPoints.Classes.GetOne;
        endPoint = endPoint.replace('{id}', id)
        this.HttpService.Get<CourseModels.Class>(endPoint).subscribe(data => {

            this.IsLoaded = true
            this.Class = data;
        })
    }

    openEditModal(property: ModalPropertyEnum, index?: string, isEdit: boolean = true) {
        const modalRef = this.modalService.open(DetailsModalComponent, { centered: true, modalDialogClass: 'course-modal' });

        this.Class.Course.Classes = [this.Class];
        modalRef.componentInstance.property = property;
        modalRef.componentInstance.course = this.Class.Course;
        modalRef.componentInstance.isEdit = isEdit;

        if (index) {
            modalRef.componentInstance.index = index;
        }

        modalRef.closed.subscribe((data) => {
            if (data == 'save') {
                this.GetClass(this.Class.Id.toString());

            } else if (data == 'delete') {
                this.Router.navigate([RoutePaths.Dashboard, RoutePaths.Courses, this.Class.Course.Id])
            }
        })
    }
}
