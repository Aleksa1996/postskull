import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';
import { Notification } from '../../../../shared/Notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public notifications: Notification[] = [];
  constructor(public notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.all().subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
  }
}
