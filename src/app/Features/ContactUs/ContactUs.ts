import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
// import { ToastifyService } from '@App/Common/Services/Toastify.Service';

import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { ContactUsModel } from './ContactUsModel';

@Component({
	standalone: true,
	templateUrl: './ContactUs.html',
	styleUrls: ['ContactUs.scss'],
	imports: [FormsModule, CommonModule, NgxChartsModule, ReactiveFormsModule]
})
export class ContactUsComponent implements OnInit {
	contactForm: FormGroup;
	ReqContactusModel: ContactUsModel.ContactUsModelReq

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService,
		private FormBuilder: FormBuilder,



	) {
		this.contactForm = this.FormBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			Email: ['', [Validators.required]],
			// age: ['', [Validators.required, Validators.min(1)]],
			description: ['', Validators.required]
		});
		this.ReqContactusModel = new ContactUsModel.ContactUsModelReq('', '', '', '');

	}


	onSubmit() {


		if (this.contactForm.valid) {
			this.ReqContactusModel.FirstName = this.contactForm.value['firstName'];
			this.ReqContactusModel.LastName = this.contactForm.value['lastName'];
			this.ReqContactusModel.Email = this.contactForm.value['Email'];
			this.ReqContactusModel.Descriabtion = this.contactForm.value['description'];

			let httpEndPoint = HttpEndPoints.Email.EmailSender;
			this.HttpService.Post<ContactUsModel.ContactUsModelReq, any>(httpEndPoint, this.ReqContactusModel
			).subscribe(
				{
					next: (response) => {
						this.NotifyService.Success("Email Sent", "check your email");
						this.contactForm.reset();




					},
					error: (errorResponse) => {
						this.NotifyService.Error('Erro', errorResponse)
						// 	console.log("Error");
						// 	console.log(errorResponse);
						// 	// to show the error on login panel
						// 	console.log(this.ErrorCodesService.GetErrorCode(errorResponse.error));
					}
				}
			);



		}
		else {
			this.NotifyService.Error('Erro', 'Enter All fields')
			// console.log(this.contactForm.);
		}
	}

	ngOnInit() { }
}
