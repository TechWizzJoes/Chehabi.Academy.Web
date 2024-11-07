import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class NotificationButtonComponent implements OnInit, AfterViewInit {
  RoutePaths = RoutePaths;
  Notifications: NotificationModels.InApp[] = []
  counter: number = 0;
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
      .replace("{isRead}", "false")
      .replace("{page}", "0");
    this.HttpService.Get<NotificationModels.InApp[]>(endPoint).subscribe(data => {
      this.Notifications = data;
      this.UpdateCounter();
    })
  }

  subscribeToNewItems() {
    this.WebSocketService.onMessage('notification').subscribe({
      next: (notification) => {
        this.Notifications.push({
          Text: notification.message
        } as NotificationModels.InApp);
        this.UpdateCounter();
      }
    })
  }

  onPopoverOpen() {
    this.observeItems();
  }

  onPopoverClose() {
    this.observer.disconnect();
    clearInterval(this.interval);
  }

  observeItems(): void {
    setTimeout(() => {
      const items = document.querySelectorAll('.item-text-popup');
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
        this.UpdateCounter();
      })
    });
  }

  UpdateCounter() {
    this.counter = this.Notifications.filter(i => !i.IsRead).length;
  }
}
