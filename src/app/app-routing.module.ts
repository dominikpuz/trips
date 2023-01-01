import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListTripsComponent} from "./list-trips/list-trips.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AddTripComponent} from "./add-trip/add-trip.component";
import {TripDetailsComponent} from "./trip-details/trip-details.component";
import {CartComponent} from "./cart/cart.component";
import {TripHistoryComponent} from "./trip-history/trip-history.component";
import {LoginComponent} from "./login/login.component";
import {AdminViewComponent} from "./admin-view/admin-view.component";
import {TripManagerComponent} from "./trip-manager/trip-manager.component";
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./guard/auth.guard";
import {LoggedGuard} from "./guard/logged.guard";
import {AdminGuard} from "./guard/admin.guard";
import {ManagerGuard} from "./guard/manager.guard";
import {EditTripComponent} from "./edit-trip/edit-trip.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'log-in', component: LoginComponent, canActivate: [LoggedGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoggedGuard]},
  {path: 'admin-view', component: AdminViewComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'trip-manager', component: TripManagerComponent, canActivate: [AuthGuard, ManagerGuard]},
  {path: 'offers/:id', component: TripDetailsComponent},
  {path: 'offers', component: ListTripsComponent},
  {path: 'add-trip', component: AddTripComponent, canActivate: [AuthGuard, ManagerGuard]},
  {path: 'edit-trip/:id', component: EditTripComponent, canActivate: [AuthGuard, ManagerGuard]},
  {path: 'cart', component: CartComponent},
  {path: 'trip-history', component: TripHistoryComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
