import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { TranslateModule } from '@ngx-translate/core';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';

@Component({
    standalone: true,
    templateUrl: './UpcomingSessions.html',
    styleUrls: ['UpcomingSessions.scss'],
    imports: [FormsModule, CommonModule, RouterModule, LoaderComponent, TranslateModule],
})
export class UpcomingSessionsComponent implements OnInit {
    RoutePaths = RoutePaths;
    IsLoaded: boolean = false;
    data: any
    currentUser!: AuthModels.CurrentUserResModel;
    constructor(
        private AuthService: AuthService
    ) {
        this.currentUser = this.AuthService.CurrentUser;
    }

    ngOnInit() {
    }

}
