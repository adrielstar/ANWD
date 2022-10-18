import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsComponent } from './charts/charts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LeafletComponent } from './leaflet/leaflet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {HttpClientModule} from "@angular/common/http";
import { NvD3Module } from 'ng2-nvd3';
import 'nvd3';
import { SpinnerComponent } from './share/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent,
    DashboardComponent,
    HeaderComponent,
    LeafletComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LeafletModule,
    MatCardModule,
    MatSlideToggleModule,
    NvD3Module,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
