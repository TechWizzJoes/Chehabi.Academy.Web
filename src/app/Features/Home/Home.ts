import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TranslateModule } from '@ngx-translate/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { LaptopComponent } from './Laptop/Laptop';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { WhatsNewModels } from '@App/Common/Models/WhatsNew.Models';

@Component({
	standalone: true,
	templateUrl: './Home.html',
	styleUrls: ['Home.scss'],
	imports: [FormsModule, CommonModule, RouterModule, NgxChartsModule, TranslateModule, NgbCarouselModule, LaptopComponent]
})
export class HomeComponent implements OnInit {
	WhatsNew!: WhatsNewModels.WhatsNew[];

	RoutePaths = RoutePaths

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService
	) {
		window.addEventListener("scroll", function () {
			const page = document.querySelector("#home-page");
			if (window.scrollY > 56) {
				page?.classList.add("page-scrolled");
			} else {
				page?.classList.remove("page-scrolled");
			}
		});
	}

	ngOnInit() {
		this.getWhatsNew()
	}

	getWhatsNew() {
		let endPoint = HttpEndPoints.WhatsNew.GetAll;
		this.HttpService.Get<WhatsNewModels.WhatsNew[]>(endPoint).subscribe(data => {
			console.log(data);

			this.WhatsNew = data
		})
	}
}
