import { CalendarComponent, EventBase, EventType } from '@App/Common/Widgets/Calendar/Calendar';
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

interface AnyObject {
  [key: string]: any;
}
// Ensure you have imported it correctly in your module or component
@Component({
  standalone: true,
  selector: 'app-generic-calendar',
  templateUrl: './GenericCalendar.html',
  styleUrls: ['./GenericCalendar.scss'],
  imports: [FormsModule, CommonModule, NgxChartsModule, CalendarComponent] // Import CalendarComponent here
})
export class GenericCalendarComponent<T extends object> implements OnInit {
  @Input() items: T[] = [];
  events: EventBase[] = [];

  ngOnInit() {
    this.events = this.items.map(item => this.mapToEventBase(item));
  }

  mapToEventBase(item: T & AnyObject): EventBase {
    // Extracting date properties dynamically
    const dateProps = Object.keys(item).filter(prop =>
      item[prop] instanceof Date
    );

    // Default values
    const defaultType = EventType.Session;
    const defaultPeriod = '1';

    // Mapping logic
    return {
      startDate: dateProps.length > 0 ? item[dateProps[0]] as Date : new Date(),
      date: dateProps.length > 0 ? item[dateProps[0]] as Date : new Date(),
      title: item['title'] || 'Untitled Event',
      description: item['description'] || 'No description available',
      type: item['type'] || defaultType,
      time: item['time'] || new Date().toTimeString().split(' ')[0], // Example format
      period: item['period'] || defaultPeriod
    };
  }
}
