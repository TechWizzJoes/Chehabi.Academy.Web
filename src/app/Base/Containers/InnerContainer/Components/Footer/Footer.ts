import { ApplicationService } from '@App/Common/Services/Application.Service';
import { Constants } from '@App/Common/Settings/Constants';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	standalone: true,
	selector: 'app-footer',
	templateUrl: './Footer.html',
	styleUrls: ['./Footer.scss'],
	imports: [
		CommonModule,
		RouterModule,
		TranslateModule,
	]
})
export class FooterComponent {
	Year = Constants.GetYear();
	RoutePaths = RoutePaths

	constructor(protected ApplicationService: ApplicationService) { }

	ngOnInit() { }
}
