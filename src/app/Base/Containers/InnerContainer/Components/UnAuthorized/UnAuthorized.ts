import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-unAuthorized',
	templateUrl: './UnAuthorized.html',
	styleUrls: ['./UnAuthorized.scss'],
	standalone: true,
	imports: [CommonModule, RouterModule, TranslateModule]
})
export class UnAuthorizedComponent {
	RoutePaths = RoutePaths;
}
