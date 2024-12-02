import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TosModalComponent } from './TosModal/TosModal';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tos',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule
    // NgbModalModule
  ],
  templateUrl: './Tos.html',
  styleUrl: './Tos.scss',
})
export class TosComponent {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void { }

  OnTosClick() {
    const modalRef = this.modalService.open(TosModalComponent, { centered: true, size: 'lg' });
  }
}