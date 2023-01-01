import {Component, OnInit} from '@angular/core';
import {ParseTripsService} from "../services/parse-trips.service";
import {map} from "rxjs";
import {Trip} from "../models/trip.model";
import {CurrencyService} from "../services/currency.service";

@Component({
  selector: 'app-trip-manager',
  templateUrl: './trip-manager.component.html',
  styleUrls: ['./trip-manager.component.css']
})
export class TripManagerComponent implements OnInit{

  trips!: Trip[];

  constructor(private ParseTripsService: ParseTripsService, public CurrencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.ParseTripsService.getTrips().snapshotChanges().pipe(map((changes: any) => {
      return changes.map((trip: any) => ({id: trip.payload.key, ... trip.payload.val()}))
    })).subscribe((trips: Trip[]) => {
      trips.forEach(trip => {
        trip.tmpAmount = 0;
      });
      this.trips = trips;
    });
  }

  public removeTrip(trip: Trip) {
    this.ParseTripsService.deleteTrip(trip);
  }

}
