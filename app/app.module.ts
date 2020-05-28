import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { NgxModalComponent } from './ngx-modal/ngx-modal.component';
import { InterfaceService } from 'src/interfaces.service';
import {MatTooltipModule} from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NgxModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [NgxSmartModalService, InterfaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }