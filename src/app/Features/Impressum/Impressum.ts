import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { TranslateModule } from '@ngx-translate/core';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { RouterModule } from '@angular/router';

@Component({
	standalone: true,
	templateUrl: './Impressum.html',
	styleUrls: ['Impressum.scss'],
	imports: [FormsModule, CommonModule, TranslateModule, RouterModule]
})
export class ImpressumComponent implements OnInit {
	CurrentUser!: AuthModels.CurrentUserResModel
	RoutePaths = RoutePaths

	constructor(
		protected router: Router,
		private route: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		protected AuthService: AuthService,
		private StorageService: StorageService
	) { }

	ngOnInit() {
	}

	sendEmail(email: string) {
		window.location.href = `mailto:${email}`;
	}

	callPhone(phone: string) {
		window.location.href = `tel:${phone}`;
	}

	openWhatsApp(phone: string) {
		// Open WhatsApp chat (phone number must include country code, no + or spaces)
		const formattedPhone = phone.replace(/\D/g, '');
		window.open(`https://wa.me/${formattedPhone}`, '_blank');
	}
}
