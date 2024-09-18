import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { TranslateModule } from '@ngx-translate/core';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { HttpService } from '@App/Common/Services/Http.Service';
import { CourseModels } from '@App/Common/Models/Course.Models';

@Component({
    standalone: true,
    templateUrl: './UpcomingSessions.html',
    styleUrls: ['UpcomingSessions.scss'],
    imports: [FormsModule, CommonModule, RouterModule, LoaderComponent, TranslateModule],
})
export class UpcomingSessionsComponent implements OnInit {
    RoutePaths = RoutePaths;
    IsLoaded: boolean = false;

    currentUser!: AuthModels.CurrentUserResModel;
    UpcomingSessions: CourseModels.LiveSession[] = [];

    constructor(
        private AuthService: AuthService,
        private HttpService: HttpService
    ) {
        this.currentUser = this.AuthService.CurrentUser;
    }

    ngOnInit() {
        this.getUserClasses();
    }

    getUserClasses() {
        let endPoint = HttpEndPoints.Sessions.GetUpcoming;
        this.HttpService.Get<CourseModels.LiveSession[]>(endPoint).subscribe(data => {
            this.IsLoaded = true
            this.UpcomingSessions = data;
        })
    }

}
