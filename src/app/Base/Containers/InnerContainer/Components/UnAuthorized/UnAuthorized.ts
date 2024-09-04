import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';

@Component({
	selector: 'app-unAuthorized',
	templateUrl: './UnAuthorized.html',
	styleUrls: ['./UnAuthorized.scss'],
	standalone: true,
	imports: [CommonModule, RouterModule]
})
export class UnAuthorizedComponent {
	RoutePaths = RoutePaths;
}
