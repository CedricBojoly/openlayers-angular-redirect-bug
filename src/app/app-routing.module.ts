import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAfterMarkerClickComponent } from './page-after-marker-click/page-after-marker-click.component';
import { MapComponent } from './map/map.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'map', component: MapComponent},
  {path: 'page-after-marker-click', component: PageAfterMarkerClickComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
