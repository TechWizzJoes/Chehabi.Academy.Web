import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '@App/Common/Services/Language.Service';
import { TranslateModule } from '@ngx-translate/core';
import { WebSocketService } from '@App/Common/Services/Websocket.Service';

export class Language {
  Name!: string;
  Key!: string;
}

@Component({
  selector: 'app-notification-button',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbPopoverModule, TranslateModule],
  templateUrl: './NotificationButton.html',
  styleUrl: './NotificationButton.scss',
})
export class NotificationButtonComponent {
  Notifications: any[] = []

  constructor(private c: WebSocketService) {
    this.c.onMessage('notification').subscribe({
      next: (notification) => {
        this.Notifications.push(notification)
      }
    })
  }

}
