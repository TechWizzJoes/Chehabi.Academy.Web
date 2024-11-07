import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '@App/Common/Services/Language.Service';
import { TranslateModule } from '@ngx-translate/core';
import { WebSocketService } from '@App/Common/Services/Websocket.Service';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { HttpClient } from '@angular/common/http';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { NotificationModels } from '@App/Common/Models/Notifications.Models';
import { HttpService } from '@App/Common/Services/Http.Service';

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
export class NotificationButtonComponent implements OnInit {
  RoutePaths = RoutePaths;
  Notifications: NotificationModels.InApp[] = []

  constructor(private WebSocketService: WebSocketService, private HttpService: HttpService) { }

  ngOnInit(): void {
    const endPoint = HttpEndPoints.Notifications.GetInApp.replace("{isRead}", "false");

    this.HttpService.Get<NotificationModels.InApp[]>(endPoint).subscribe(data => {
      this.Notifications = data
    })
    this.WebSocketService.onMessage('notification').subscribe({
      next: (notification) => {
        this.Notifications.push({
          Text: notification.message
        } as NotificationModels.InApp);
      }
    })
  }

}
