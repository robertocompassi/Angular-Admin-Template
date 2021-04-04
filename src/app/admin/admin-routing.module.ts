import { AuthGuard } from './../auth.guard';
import { UsersComponent } from './users/users.component';
import { MasterComponent } from './master/master.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './users/register/register.component';
import { NotFoundComponent } from './master/not-found/not-found.component';

const adminRoutes: Routes = [
  {
    path: '', component: MasterComponent, canActivate: [AuthGuard], data: { roles: 'Administrator' }, children: [
      {path: '', redirectTo: 'usuarios'},
      {
        path: 'usuarios', children: [
          { path: '', component: UsersComponent },
          { path: 'editar/:id', component: RegisterComponent },
          { path: 'novo-usuario', component: RegisterComponent },
        ]
      }
    ]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
