import { GeoChart } from './plotly/geo-chart';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PopDataComponent } from './components/popdata/popdata.component';
import { PopDataService } from './components/popdata/popdata.service';
import { geoClipAntimeridian } from 'd3';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    PopDataComponent,
    GeoChart
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'chart', component: GeoChart},
      {path: 'table', component: PopDataComponent}
    ]),
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    Ng2SearchPipeModule

  ],
  providers: [
    PopDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
