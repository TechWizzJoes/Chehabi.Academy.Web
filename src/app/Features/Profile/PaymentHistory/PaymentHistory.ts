import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentModels } from '@App/Common/Models/Payment.Models';

@Component({
	standalone: true,
	templateUrl: './PaymentHistory.html',
	styleUrls: ['PaymentHistory.scss'],
	imports: [FormsModule, CommonModule, LoaderComponent, TranslateModule]
})
export class PaymentHistoryComponent implements OnInit {
	IsLoaded: boolean = false;
	Payments!: PaymentModels.Payment[];

	constructor(
		private Router: Router,
		private ActivatedRoute: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService
	) { }

	ngOnInit() {
		let endPoint = HttpEndPoints.Payment.GetAll
		this.HttpService.Get<PaymentModels.Payment[]>(endPoint).subscribe(data => {
			this.IsLoaded = true
			this.Payments = data;
			console.log(this.Payments);

		})
	}

}
