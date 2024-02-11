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

@Component({
    standalone: true,
    templateUrl: './Courses.html',
    styleUrls: ['Courses.scss'],
    imports: [FormsModule, CommonModule, RouterModule, LoaderComponent]
})
export class CoursesComponent implements OnInit {
    IsLoaded: boolean = false;
    data: any
    courses: any[] = [1, 2, 3]
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
        let endPoint = HttpEndPoints.Profile.getInfo
        // this.HttpService.Get<UserModels.User>(endPoint).subscribe(data => {
        // 	this.IsLoaded = true
        // 	this.data = data
        // })
    }

    viewDetails(id: number) {
        this.Router.navigate(['/', RoutePaths.Dashboard, RoutePaths.Courses, 0])
    }

    openModal(title: string, state: string = '') {
        const modalRef = this.modalService.open(DetailsModalComponent, { centered: true, modalDialogClass: 'course-modal' });
        modalRef.componentInstance.state = state;
        modalRef.componentInstance.title = title;
    }

}