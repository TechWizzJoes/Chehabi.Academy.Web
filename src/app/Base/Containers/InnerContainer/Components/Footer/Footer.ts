import { Constants } from '@App/Common/Settings/Constants';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { Component } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './Footer.html',
	styleUrls: ['./Footer.scss']
})
export class FooterComponent {
	Year = Constants.GetYear();
	RoutePaths = RoutePaths

	constructor() { }

	ngOnInit() { }
}
