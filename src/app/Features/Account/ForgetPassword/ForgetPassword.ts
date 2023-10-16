import { Component, Renderer2 } from '@angular/core';
import { AccountModels } from '@App/Features/Account/Account.Models';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HttpService } from '@App/Common/Services/Http.Service';
import { AuthModels } from '@App/Common/Models/Auth.Models';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { CommonModule } from '@angular/common';

@Component({
	standalone: true,
	imports: [FormsModule, CommonModule],
	templateUrl: './ForgetPassword.html',
	styleUrls: ['./ForgetPassword.scss']
})
export class ForgetPasswordComponent {
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private HttpService: HttpService,
		private NotifyService: NotifyService
	) { }

	ngOnInit() { }
}
