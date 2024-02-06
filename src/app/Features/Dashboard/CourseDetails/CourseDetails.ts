import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
    templateUrl: './CourseDetails.html',
    styleUrls: ['CourseDetails.scss'],
    imports: [FormsModule, CommonModule, NgxChartsModule, LoaderComponent]
})
export class CourseDetailsComponent implements OnInit {
    IsLoaded: boolean = false;
    data: any
    courses: any[] = [1, 2, 3];
    constructor(
        private Router: Router,
        private ActivatedRoute: ActivatedRoute,
        private HttpService: HttpService,
        private ErrorCodesService: ErrorCodesService,
        private NotifyService: NotifyService,
        private AuthService: AuthService,
        private StorageService: StorageService,
        private modalSevice: NgbModal
    ) { }

    ngOnInit() {
        let endPoint = HttpEndPoints.Profile.getInfo
        // this.HttpService.Get<UserModels.User>(endPoint).subscribe(data => {
        // 	this.IsLoaded = true
        // 	this.data = data
        // })
    }

    openEditModal(title: string, state: string = '') {
        const modalRef = this.modalSevice.open(DetailsModalComponent, { centered: true });
        modalRef.componentInstance.state = state;
        modalRef.componentInstance.title = title;
    }


}
