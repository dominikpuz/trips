import {Injectable} from '@angular/core';
import {Cart} from "../models/cart.model";
import {Trip} from "../models/trip.model";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {ParseUserService} from "./parse-user.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart;
  // private dbRef;

  constructor(private db: AngularFireDatabase, private ParseUserService: ParseUserService, private AuthService: AuthService) {
    // this.AuthService.getUserObservable().subscribe()
    this.cart = {
      reservedTrips: [],
      reservedTripsTotal: 0,
      totalCost: 0
    };
    // this.dbRef = db.list('users/1/' + 'trip-history');
  }

  public getReservedTrips(): Trip[] {
    return this.cart.reservedTrips;
  }

  public getReservedTripsCount(): number {
    return this.cart.reservedTripsTotal;
  }

  public getTotalCost(): number {
    return this.cart.totalCost;
  }

  public addToCartEvent(trip: Trip): void {
    this.cart.reservedTripsTotal++;
    this.cart.totalCost += trip.unitPrice;
    let flag = false;
    this.cart.reservedTrips.forEach(tripCart =>  {
      if (tripCart.id == trip.id) {
        tripCart.tmpAmount = trip.tmpAmount;
        flag = true;
      }
    });
    if (!flag) {
      this.cart.reservedTrips.push(trip);
    }
  }

  public removeFromCartEvent(trip: Trip): void {
    this.cart.reservedTripsTotal--;
    this.cart.totalCost -= trip.unitPrice;
    if (trip.tmpAmount == 0) {
      for (let i = 0; i < this.cart.reservedTrips.length; i++) {
        if (trip.id === this.cart.reservedTrips[i].id) {
          this.cart.reservedTrips.splice(i, 1);
          break;
        }
      }
    }
  }

  public buyTrip(trip: Trip) {
    let tmp = trip.tmpAmount;
    this.ParseUserService.buyTrip(trip);
    for (let i = 0; i < this.cart.reservedTrips.length; i++) {
      if (trip.id === this.cart.reservedTrips[i].id) {
        this.cart.reservedTrips.splice(i, 1);
        break;
      }
    }
    this.cart.totalCost -= tmp * trip.unitPrice;
    this.cart.reservedTripsTotal -= tmp;
    return this.cart.reservedTrips;
  }
}
