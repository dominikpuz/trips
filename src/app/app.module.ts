import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTripsComponent } from './list-trips/list-trips.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { HttpClientModule } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddTripComponent } from './add-trip/add-trip.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import {GoogleMapsModule} from "@angular/google-maps";

import { environment } from '../environments/environment'
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { CartComponent } from './cart/cart.component';
import { NgxStarRatingModule } from "ngx-star-rating";
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { StatusPipe } from './pipes/status.pipe';
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import { LoginComponent } from './login/login.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { TripManagerComponent } from './trip-manager/trip-manager.component';
import { RegisterComponent } from './register/register.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    ListTripsComponent,
    TripCardComponent,
    AddTripComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavComponent,
    TripDetailsComponent,
    CartComponent,
    TripHistoryComponent,
    StatusPipe,
    LoginComponent,
    AdminViewComponent,
    TripManagerComponent,
    RegisterComponent,
    EditTripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleMapsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgxStarRatingModule,
    ReactiveFormsModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
