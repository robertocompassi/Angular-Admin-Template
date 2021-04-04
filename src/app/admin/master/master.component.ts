import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  isSideBarOpen: boolean;

  constructor() { }

  ngOnInit() {
  }

  receiveSidebarState($event, mainContent) {
    this.isSideBarOpen = $event;

    if (this.isSideBarOpen) {
      mainContent.classList.add('open-sidebar');
    } else {
      mainContent.classList.remove('open-sidebar');
    }
  }

}
