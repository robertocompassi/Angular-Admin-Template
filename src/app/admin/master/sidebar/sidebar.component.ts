import { UserService } from './../../../common-services/user.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Output() sidebarStateEvent = new EventEmitter<boolean>();

  userSidebar: User;

  constructor(private userService: UserService) {
    this.userSidebar = this.userService.getSessionUser();
  }

  ngOnInit() {

  }

  openMenu(event) {
    if (!event.target.parentElement.classList.contains('open')) {
      event.target.parentElement.classList.add('open');
    } else {
      event.target.parentElement.classList.remove('open');
    }
  }

  toggleSidebar(event, sidebar) {

    // toggle class in sidebar
    if (!sidebar.classList.contains('sidebar-open')) {
      sidebar.classList.add('sidebar-open');
    } else {
      sidebar.classList.remove('sidebar-open');
    }
    this.sidebarStateEvent.emit(sidebar.classList.contains('sidebar-open'));
  }
}
