import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Trip} from "../models/trip.model";

@Injectable({
  providedIn: 'root'
})
export class ParseTripsService {
  private url = 'http://localhost:3000/trips';

  constructor(private http: HttpClient ) { }

  public getTrips() {
    return this.http.get<Trip[]>(this.url);
  }

  public addTrip(trip: Trip): void {
    this.http.post(this.url, trip);
  }
}
