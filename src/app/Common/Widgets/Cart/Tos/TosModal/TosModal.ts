import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './TosModal.html',
  styleUrl: './TosModal.scss',
})
export class TosModalComponent {

  constructor(public activeModal: NgbActiveModal) { }
}