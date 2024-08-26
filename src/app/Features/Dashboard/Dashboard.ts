import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    templateUrl: './Dashboard.html',
    styleUrls: ['Dashboard.scss'],
    imports: [FormsModule, CommonModule, RouterModule, LoaderComponent, TranslateModule]
})
export class DashboardComponent implements OnInit {
    IsLoaded: boolean = false;
    data: any
    courses: any[] = [1, 2, 3]
    currentUser!: AuthModels.CurrentUserResModel;
    constructor(
        private AuthService: AuthService
    ) {
        this.currentUser = this.AuthService.CurrentUser;
    }

    ngOnInit() {
    }

}
