import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '@App/Common/Services/Auth.Service';
import { NotifyService } from '@App/Common/Services/Notify.Service';
import { ErrorCodesService } from '@App/Common/Services/ErrorCodes.Service';
import { StorageService } from '@App/Common/Services/Storage.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
	standalone: true,
	templateUrl: './ContactUs.html',
	styleUrls: ['ContactUs.scss'],
	imports: [FormsModule, CommonModule, NgxChartsModule, ReactiveFormsModule]
})
export class ContactUsComponent implements OnInit {
	contactForm: FormGroup;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private HttpService: HttpService,
		private ErrorCodesService: ErrorCodesService,
		private NotifyService: NotifyService,
		private AuthService: AuthService,
		private StorageService: StorageService,
		private fb: FormBuilder
	) {
		this.contactForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			age: ['', [Validators.required, Validators.min(1)]],
			description: ['', Validators.required]
		});
	}

	onSubmit() {
		if (this.contactForm.valid) {
			// Handle form submission here
			console.log(this.contactForm.value);
		}
	}

	ngOnInit() {}
}