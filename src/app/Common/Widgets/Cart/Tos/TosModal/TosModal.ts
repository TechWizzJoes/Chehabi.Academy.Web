import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tos',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './TosModal.html',
  styleUrl: './TosModal.scss',
})
export class TosModalComponent {
  terms = [
    {
      title: 'Tos.terms.t1',
      content: 'Tos.terms.c1'
    },
    {
      title: 'Tos.terms.t2',
      content: 'Tos.terms.c2'
    },
    {
      title: 'Tos.terms.t3',
      content: 'Tos.terms.c3'
    },
    {
      title: 'Tos.terms.t4',
      content: 'Tos.terms.c4'
    },
    {
      title: 'Tos.terms.t5',
      content: 'Tos.terms.c5'
    },
    {
      title: 'Tos.terms.t6',
      content: 'Tos.terms.c6'
    },
    {
      title: 'Tos.terms.t7',
      content: 'Tos.terms.c7'
    },
    {
      title: 'Tos.terms.t8',
      content: 'Tos.terms.c8'
    }
  ];

  constructor(public activeModal: NgbActiveModal) { }
}