import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModels } from '@App/Common/Models/Notifications.Models';
import { HttpEndPoints } from '@App/Common/Settings/HttpEndPoints';
import { RoutePaths } from '@App/Common/Settings/RoutePaths';
import { WebSocketService } from '@App/Common/Services/Websocket.Service';
import { HttpService } from '@App/Common/Services/Http.Service';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '@App/Common/Widgets/Spinners/Loader/Loader';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, TranslateModule, LoaderComponent],
  templateUrl: './Notifications.html',
  styleUrl: './Notifications.scss'
})
export class NotificationsComponent implements OnInit {
  RoutePaths = RoutePaths;
  Notifications: NotificationModels.InApp[] = []
  IsLoaded: boolean = false;

  constructor(private WebSocketService: WebSocketService, private HttpService: HttpService) { }

  ngOnInit(): void {
    const endPoint = HttpEndPoints.Notifications.GetInApp.replace("{isRead}", "");// get all 

    this.HttpService.Get<NotificationModels.InApp[]>(endPoint).subscribe(data => {
      this.IsLoaded = true;
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