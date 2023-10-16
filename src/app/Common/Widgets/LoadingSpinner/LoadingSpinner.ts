import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-loading-spinner',
	templateUrl: './LoadingSpinner.html',
	styleUrls: ['./LoadingSpinner.scss'],
	standalone: true,
	imports: [FormsModule, CommonModule]
})
export class LoadingSpinnerComponent {
	@Input() Scale?: number;
}
