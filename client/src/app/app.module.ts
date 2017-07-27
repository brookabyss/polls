import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms'
import {HttpModule } from '@angular/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ShowComponent } from './show/show.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewComponent } from './new/new.component';
import { HttpService } from './http.service';
import { SearchPipe } from './search.pipe';
import { GetKeysPipe } from './get-keys.pipe';
import { SearchPollsPipe } from './search-polls.pipe'

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ShowComponent,
    DashboardComponent,
    NewComponent,
    SearchPipe,
    GetKeysPipe,
    SearchPollsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
