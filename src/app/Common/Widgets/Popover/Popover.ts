import { Component, ContentChild, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	standalone: true,
	selector: 'Popover-template',
	templateUrl: './Popover.html',
	styleUrls: ['./Popover.scss'],
	imports: [NgbPopoverModule]
})
export class PopoverComponent implements OnInit {
	@Input() PopName!: string;
	@ContentChild('popContent') popContent!: TemplateRef<ElementRef>;
	@ContentChild('popTitle') popTitle!: TemplateRef<ElementRef>;
	@Input() TogglePop!: boolean;

	ngOnInit(): void {
		console.log('>>>>  this.TogglePop ', this.TogglePop);
	}
	toggleWithGreeting(popover: any) {
		console.log('Popver >>>>> ', popover);

		if (popover.isOpen()) {
			popover.close();
		} else {
			popover.open();
		}
	}
}
