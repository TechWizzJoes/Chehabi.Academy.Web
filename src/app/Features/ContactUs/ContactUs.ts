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
import { ContactUsModel } from '../../Common/Models/ContactUsModel';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';
import { MessagesEnum } from '@App/Common/Enums/Messages.Enum';

@Component({
	standalone: true,
	templateUrl: './ContactUs.html',
	styleUrls: ['ContactUs.scss'],
	imports: [FormsModule, CommonModule, NgxChartsModule, ReactiveFormsModule, TranslateModule, LoaderComponent]
})
export class ContactUsComponent implements OnInit {
	contactForm!: FormGroup;
	ReqContactusModel!: ContactUsModel.ContactUsModelReq
	IsLoaded: boolean = true;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		public AuthService: AuthService,
		private StorageService: StorageService,
		private FormBuilder: FormBuilder,
	) { }

	ngOnInit() {
		this.contactForm = this.FormBuilder.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			Email: ['', [Validators.required]],
			// age: ['', [Validators.required, Validators.min(1)]],
			description: ['', Validators.required]
		});
		this.ReqContactusModel = new ContactUsModel.ContactUsModelReq('', '', '', '');

		if (this.AuthService.IsAuthenticated) {
			this.contactForm.get('Email')?.setValue(this.AuthService.CurrentUser.Email)
			this.contactForm.get('Email')?.disable()
		}
	}

	onSubmit() {
		if (this.contactForm.valid) {
			this.ReqContactusModel.FirstName = this.contactForm.value['firstName'];
			this.ReqContactusModel.LastName = this.contactForm.value['lastName'];
			this.ReqContactusModel.Email = this.AuthService.IsAuthenticated ? this.AuthService.CurrentUser.Email : this.contactForm.value['Email'];
			this.ReqContactusModel.Description = this.contactForm.value['description'];

			this.IsLoaded = false;
			let httpEndPoint2 = HttpEndPoints.Contact.Add;
			this.HttpService.Post<ContactUsModel.ContactUsModelReq, any>(httpEndPoint2, this.ReqContactusModel
			).subscribe(
				{
					next: (response) => {
						this.IsLoaded = true;
						this.NotifyService.Success(MessagesEnum.INQUIRY_SENT, MessagesEnum.THANK_YOU);
						this.contactForm.reset();
					},
					error: (errorResponse) => {
						this.IsLoaded = true;
						this.NotifyService.Error(errorResponse, 'Error')
					}
				}
			);



		}
		else {
			this.NotifyService.Error('Enter All fields', 'Error')
			// console.log(this.contactForm.);
		}
	}
}
