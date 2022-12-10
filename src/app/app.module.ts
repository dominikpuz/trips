import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTripsComponent } from './list-trips/list-trips.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule} from "@angular/forms";
import { AddTripComponent } from './add-trip/add-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    ListTripsComponent,
    TripCardComponent,
    AddTripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
