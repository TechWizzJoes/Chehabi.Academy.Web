import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
declare let $: any;
import { HelperService } from '@App/Common/Services/Helper.Service';

@Injectable({ providedIn: 'root' })
export class NotifyService {
	constructor(
		private Toastr: ToastrService,
		private HelperService: HelperService
	) { }

	ToastrOptions = {
		timeOut: 3000,
		easing: 'easeOutQuint',
		easeTime: 500,
		closeButton: true,
		progressBar: true,
		// progressAnimation:'increasing',
		positionClass: 'toast-top-right'
	};

	Success(message: string, title: string = '') {
		this.Toastr.success(message, title, this.ToastrOptions);
		// Swal.fire({
		// 	position: 'top-end',
		// 	icon: 'success',
		// 	//title: title,
		// 	text: message,
		// 	showConfirmButton: false,
		// 	timer: 1500
		// 	//toast:true
		// });
	}

	Error(message: string, title: string = '', timer = 5000) {
		this.Toastr.error(message, title, this.ToastrOptions);
		// Swal.fire({
		// 	position: 'top-end',
		// 	icon: 'error',
		// 	//title: title,
		// 	text: message,
		// 	showConfirmButton: false,
		// 	//timer: undefined
		// 	timer: timer
		// });
	}

	ServerError(message: string, title: string = '') {
		this.Toastr.error(message, title, this.ToastrOptions);
		// Swal.fire({
		// 	position: 'top-end',
		// 	icon: 'error',
		// 	//title: title,
		// 	text: message,
		// 	showConfirmButton: false,
		// 	//timer: undefined
		// 	timer: 5000
		// 	// showCancelButton: true,
		// 	// cancelButtonText: 'اغلاق',
		// 	// cancelButtonColor: '#434343',
		// });
	}

	Warning(message: string, title: string = '') {
		this.Toastr.warning(message, title, this.ToastrOptions);
		// Swal.fire({
		// 	position: 'top-end',
		// 	icon: 'warning',
		// 	//title: title,
		// 	text: message,
		// 	showConfirmButton: false,
		// 	timer: 1500
		// });
	}

	Info(message: string, title: string = '') {
		this.Toastr.info(message, title, this.ToastrOptions);
	}

	// ConfigurationError(text: string = '') {
	// 	Swal.fire({
	// 		icon: 'error',
	// 		title: 'Oops...',
	// 		text: text
	// 	});
	// }

	ScanEnablePopup(htmlBody: string, title: string = '', footerHtml: string = '') {
		//this is to force confirm when the footer link is clicked so initialize scanner
		$(document).on('click', '#enable-btn', function () {
			Swal.clickConfirm();
		});

		return Swal.fire({
			title: title,
			icon: 'info',
			html: htmlBody,
			showCloseButton: true,
			showConfirmButton: false,
			footer: footerHtml
		});
	}

	Show(message: string, title: string = '') {
		this.Toastr.show(message, title, this.ToastrOptions);
	}

	// Confirm(title: string, message: string, confirmButtonText: string, cancelButtonText: string) {
	// 	return Swal.fire({
	// 		title: title,
	// 		text: message,
	// 		icon: 'question',
	// 		iconHtml: '؟',
	// 		showCancelButton: true,
	// 		confirmButtonText: confirmButtonText,
	// 		cancelButtonText: cancelButtonText,
	// 		confirmButtonColor: '#26C281',
	// 		cancelButtonColor: '#434343'
	// 	}).then((result) => result.value);
	// }

	// ConfirmDelete(): Promise<boolean> {
	// 	return this.Confirm('Confirm Delete', 'Are you sure that you want delete this row?', 'Yes', 'No');
	// }

	// Warning2(message: string, confirmButtonText: string, title: string = '') {
	// 	return Swal.fire({
	// 		title: title,
	// 		text: message,
	// 		icon: 'warning',
	// 		showConfirmButton: true,
	// 		confirmButtonText: confirmButtonText,
	// 		confirmButtonColor: '#434343'
	// 	}).then((result) => result.value);
	// }

	Close() {
		Swal.close();
	}
}
