import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';

@Component({
    standalone: true,
    templateUrl: './Dashboard.html',
    styleUrls: ['Dashboard.scss'],
    imports: [FormsModule, CommonModule, RouterModule, LoaderComponent]
})
export class DashboardComponent implements OnInit {
    IsLoaded: boolean = false;
    data: any
    courses: any[] = [1, 2, 3]
    constructor(
    ) { }

    ngOnInit() {
    }

}
