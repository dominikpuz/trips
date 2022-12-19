import {Component, OnInit} from '@angular/core';
import {Trip} from "../models/trip.model";
import {ParseTripsService} from "../services/parse-trips.service";
import {CartService} from "../services/cart.service";
import {map} from "rxjs";

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.css']
})
export class ListTripsComponent implements  OnInit {
  trips!: Trip[];

  public formIsOpen: boolean = false;

  constructor(private ParseTripsService: ParseTripsService, public CartService: CartService) { }

  ngOnInit(): void {
    this.ParseTripsService.getTrips().snapshotChanges().pipe(map((changes: any) => {
      return changes.map((trip: any) => ({id: trip.payload.key, ... trip.payload.val()}))
    })).subscribe((trips: Trip[]) => {
      trips.forEach(trip => {
        trip.tmpAmount = 0;
        this.CartService.getReservedTrips().forEach((tripCart: Trip) => {
          if (tripCart.id == trip.id) {
            trip.tmpAmount = tripCart.tmpAmount;
          }
        });
      });
      this.trips = trips;
    });
  }

  public getMaxPrice(): number {
    let maxPrice = this.trips[0].unitPrice;
    this.trips.forEach((el) => {
      maxPrice = Math.max(maxPrice, el.unitPrice);
    });
    return maxPrice;
  }

  public getMinPrice(): number {
    let minPrice = this.trips[0].unitPrice;
    this.trips.forEach((el) => {
      minPrice = Math.min(minPrice, el.unitPrice);
    });
    return minPrice;
  }

  public openForm(): void {
    this.formIsOpen = true;
  }

  public closeForm(value: boolean): void {
    this.formIsOpen = value;
  }

}
