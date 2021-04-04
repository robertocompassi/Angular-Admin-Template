import { UserService } from './../../../common-services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private userService: UserService,
    @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit() {
    this.user = this.userService.getSessionUser();
  }

  openNavbarDropdown(event) {
    if (!event.target.offsetParent.classList.contains('dropdown-menu-open')) {
      event.target.offsetParent.classList.add('dropdown-menu-open');
    } else {
      event.target.offsetParent.classList.remove('dropdown-menu-open');
    }
  }

  logout(){
    this.router.navigate(['/']);
    localStorage.clear();
  }

  toggleSidebar() {
    console.log(this.document.getElementsByClassName('sidebar')[0].classList.add('sidebar-open'));
  }

}
