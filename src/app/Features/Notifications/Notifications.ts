import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
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
export class NotificationsComponent implements OnInit, AfterViewInit {
  RoutePaths = RoutePaths;
  Notifications: NotificationModels.InApp[] = []
  IsLoaded: boolean = false;
  page: number = 0;
  private observer!: IntersectionObserver;
  unreadItems: NotificationModels.InApp[] = [];
  interval!: NodeJS.Timer;

  constructor(private WebSocketService: WebSocketService, private HttpService: HttpService) { }

  ngOnInit(): void {
    this.getItems();
    this.subscribeToNewItems();
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;

          const elementIsUnread = this.Notifications.filter(n => n.Id.toString() == element.id && !n.IsRead)
          if (elementIsUnread.length > 0 && this.unreadItems.find(i => i.Id == elementIsUnread[0].Id) == null) {
            this.unreadItems.push(...elementIsUnread);
          }
        }
      });
    }, {
      root: null,  // Observe within the viewport
      threshold: 0.9  // Trigger when 10% of the element is visible
    });

  }

  getItems() {
    const endPoint = HttpEndPoints.Notifications.GetInApp
      .replace("{isRead}", "")
      .replace("{page}", this.page.toString());

    this.HttpService.Get<NotificationModels.InApp[]>(endPoint).subscribe(data => {
      this.IsLoaded = true;
      this.Notifications = data;
      this.observeItems();
    })
  }

  subscribeToNewItems() {
    this.WebSocketService.onMessage('notification').subscribe({
      next: (notification) => {
        this.Notifications.push({
          Text: notification.message
        } as NotificationModels.InApp);
        this.observeItems();
      }
    })
  }

  viewMore() {
    this.page++
    this.getItems();
  }

  observeItems(): void {
    setTimeout(() => {
      const items = document.querySelectorAll('.item-text');
      items.forEach((item: Element) => this.observer.observe(item));

      this.interval = setInterval(() => {
        this.unreadItems = this.unreadItems.filter(i => !i.IsRead);
        this.ReadItems(this.unreadItems.map(i => i))
      }, 1000);
    }, 100);
  }

  ReadItems(items: NotificationModels.InApp[]) {
    const ids = items.map(i => i.Id);
    if (!ids.length) return;

    const endPoint = HttpEndPoints.Notifications.ReadInApp;
    this.HttpService.Post<number[], any>(endPoint, ids).subscribe(data => {
      this.Notifications.forEach(i => {
        if (ids.includes(i.Id)) {
          i.IsRead = true;
        }
      })
    });
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
    clearInterval(this.interval);
  }
}