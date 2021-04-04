import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './master/sidebar/sidebar.component';
import { HeaderComponent } from './master/header/header.component';
import { FooterComponent } from './master/footer/footer.component';
import { MasterComponent } from './master/master.component';
import { AdminRoutingModule } from './admin-routing.module';
import { GenericErroDialogComponent } from './master/generic-erro-dialog/generic-erro-dialog.component';
import { AppCardComponent } from './master/app-card/app-card.component';
import { RegisterComponent } from './users/register/register.component';
import { LoadingSpinnerComponent } from './master/loading-spinner/loading-spinner.component';
import { NotFoundComponent } from './master/not-found/not-found.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MasterComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    LoadingSpinnerComponent,
    UsersComponent,
    RegisterComponent,
    GenericErroDialogComponent,
    AppCardComponent,
    NotFoundComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AdminRoutingModule
  ],
  providers: []
})
export class AdminModule { }
