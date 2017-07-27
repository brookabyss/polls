import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component'
import { NewComponent } from './new/new.component'
import { ShowComponent } from './show/show.component'
import {DashboardComponent} from './dashboard/dashboard.component'
const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'create',
    component: NewComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'poll/:id',
    component: ShowComponent
  },
  { path: "", pathMatch: "full", redirectTo: "/login"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
