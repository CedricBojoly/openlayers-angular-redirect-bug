import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OlMapComponent } from './ol-map/ol-map.component';
import { PageAfterMarkerClickComponent } from './page-after-marker-click/page-after-marker-click.component';
import { MapComponent } from './map/map.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    OlMapComponent,
    PageAfterMarkerClickComponent,
    MapComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
