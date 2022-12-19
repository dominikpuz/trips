import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Trip} from "../models/trip.model";
import {ParseTripsService} from "./parse-trips.service";

@Injectable({
  providedIn: 'root'
})
export class ParseUserService {

  private userid = "1";

  constructor(private db: AngularFireDatabase, private ParseTripsService: ParseTripsService) {
  }

  public getTripHistory() {
    return this.db.list('users/' + this.userid + '/trip-history');
  }

  private formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getDate().toString().padStart(2, '0'),
      ].join('-'));
  }

  public butTrip(trip: Trip) {
    const data = {
      id: trip.id,
      name: trip.name,
      destination: trip.destination,
      description: trip.description,
      amountBought: trip.tmpAmount,
      purchaseDate: this.formatDate(new Date()),
      startDate: trip.startDate,
      endDate: trip.endDate,
      unitPrice: trip.unitPrice,
      image: trip.image
    };
    trip.currParticipants += trip.tmpAmount;
    trip.tmpAmount = 0;
    this.ParseTripsService.updateTrip(trip).then(() => {
      return this.db.list('users/' + this.userid + '/trip-history').push(data);
    });
  }
}
