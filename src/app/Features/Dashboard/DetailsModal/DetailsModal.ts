import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngbd-modal-content',
    standalone: true,
    templateUrl: './DetailsModal.html',
    styleUrls: ['./DetailsModal.scss'],
    imports: [CommonModule]
})
export class DetailsModalComponent {
    activeModal = inject(NgbActiveModal);

    @Input() state: string = '';
    @Input() title: string = '';
}
