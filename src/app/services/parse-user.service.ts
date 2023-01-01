import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Trip} from "../models/trip.model";
import {ParseTripsService} from "./parse-trips.service";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class ParseUserService {

  constructor(private db: AngularFireDatabase, private ParseTripsService: ParseTripsService, private AuthService: AuthService) {
  }

  public getUsers() {
    return this.db.list('users');
  }

  public getTripHistory() {
    return this.db.list('trip-history/' + this.AuthService.getUser().id);
  }

  public changeRoles(value: boolean, uid: string, role: string) {
    return this.db.database.ref('users').child(uid).child('roles').child(role).set(value);
  }

  public banUser(value: boolean, uid: string) {
    return this.db.database.ref('users').child(uid).child('banned').set(value);
  }

  private formatDate(date: Date) {
    return (
      [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getDate().toString().padStart(2, '0'),
      ].join('-'));
  }

  public buyTrip(trip: Trip) {
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
    this.ParseTripsService.updateTripByKey('currParticipants', trip.currParticipants, trip.id).then(() => {
      return this.db.list('trip-history/' + this.AuthService.getUser().id).set(trip.id, data).catch(error => {
        console.log(error.message);
      });
    }).catch(error => {
      console.log(error.message);
    });
  }
}
