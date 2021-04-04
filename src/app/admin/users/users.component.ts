import { UsersListService } from './users-list.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  indexPage = 1;

  @ViewChild('resultList', { static: false }) resultTable: ElementRef;

  showLoadingListMsg = true;
  showGenericError = false;

  listUsers = [];

  constructor(
    private usersListService: UsersListService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private domSanitizer: DomSanitizer) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {

      if (params !== undefined) {
        if (params.page !== undefined) {
          try {
            this.indexPage = parseInt(params.page, 10);
          } catch (error) {
            console.log(error);
          }

        }
      }
    });
  }

  ngOnInit() {
    this.getUsersList();
  }

  async getUsersList() {
    this.listUsers = [];
    this.showLoadingListMsg = true;
    await this.usersListService.getListUsers(this.indexPage).then(result => {
      result.data.forEach(userData => {
        userData.imageProfile = this.domSanitizer.bypassSecurityTrustStyle(`url(${userData.avatar})`);
        this.listUsers.push(userData);
      })
    }).catch(error => this.showGenericError = true);

    this.showLoadingListMsg = false;
    this.resultTable.nativeElement.classList.add(['animated'], ['fadeIn']);
  }

  changePage(type) {
    if (type === 'next') {
      this.listUsers = [];
      this.indexPage++;
    } else {
      if (this.indexPage > 1) {
        this.indexPage--;
        this.listUsers = [];
      } else {
        return false;
      }
    }

    this.router.navigate([], {
      queryParams: {
        page: this.indexPage
      },
      queryParamsHandling: 'merge',
    });

    this.getUsersList();
  }

}
