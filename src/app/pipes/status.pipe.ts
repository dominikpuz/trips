import { Pipe, PipeTransform } from '@angular/core';
import {TripHistory} from "../models/trip-history.model";

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(trips: TripHistory[], statusArray: any[]): any {
    if (statusArray.length == 0) return trips;
    let filteredTrips: TripHistory[] = [];
    for (let status of statusArray) {
      for (let trip of trips) {
        if (status == trip.status) {
          filteredTrips.push(trip);
        }
      }
    }
    return filteredTrips;
  }

}
