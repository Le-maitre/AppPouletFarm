import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NgCalendarModule  } from 'ionic2-calendar';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar'; // Importez le module
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'; // Adapter import

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntreeComponent } from './entree/entree.component';
import { FormsModule } from '@angular/forms'; // Import 
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [AppComponent,EntreeComponent],
  imports: [FullCalendarModule,BrowserAnimationsModule,HttpClientModule,HttpClientJsonpModule,FormsModule,ReactiveFormsModule ,CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory,
  }), NgCalendarModule,BrowserModule, IonicModule.forRoot(),AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
