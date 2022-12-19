import {Component, OnInit} from '@angular/core';
import {Trip} from "../models/trip.model";
import {ParseTripsService} from "../services/parse-trips.service";

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.css']
})
export class ListTripsComponent implements  OnInit {
  trips!: Trip[];

  constructor(private ParseTripsService: ParseTripsService) { }

  ngOnInit(): void {
    this.ParseTripsService.getTrips().subscribe((trips: Trip[]) => {
      trips.forEach(trip => trip.tmpAmount = 0);
      this.trips = trips;
    });
  }

  public removeTrip(trip: Trip): void {
    for (let i = 0; i < this.trips.length; i++) {
      if (trip === this.trips[i]) {
        this.trips.splice(i,1);
        break;
      }
    }
  }

}
