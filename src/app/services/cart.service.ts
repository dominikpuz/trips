import {Injectable} from '@angular/core';
import {Cart} from "../models/cart.model";
import {Trip} from "../models/trip.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart;

  constructor() {
    this.cart = {
      reservedTrips: [],
      reservedTripsTotal: 0
    };
  }

  public getReservedTripsCount(): number {
    return this.cart.reservedTripsTotal;
  }

  private includes(trip: Trip): boolean {
    for (let i = 0; i < this.cart.reservedTrips.length; i++) {
      if (trip === this.cart.reservedTrips[i]) {
        return true;
      }
    }
    return false;
  }

  public addToCartEvent(trip: Trip): void {
    this.cart.reservedTripsTotal++;
    if (!this.includes(trip)) {
      this.cart.reservedTrips.push(trip);
    }
  }

  public removeFromCartEvent(trip: Trip): void {
    this.cart.reservedTripsTotal--;
    if (trip.tmpAmount == 0) {
      for (let i = 0; i < this.cart.reservedTrips.length; i++) {
        if (trip === this.cart.reservedTrips[i]) {
          this.cart.reservedTrips.splice(i, 1);
          break;
        }
      }
    }
  }

}
