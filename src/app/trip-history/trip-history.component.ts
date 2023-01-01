import {Component, OnInit} from '@angular/core';
import {TripHistory} from "../models/trip-history.model";
import {ParseUserService} from "../services/parse-user.service";
import {map} from "rxjs";
import {CurrencyService} from "../services/currency.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css']
})
export class TripHistoryComponent implements OnInit {
  public trips!: TripHistory[];
  public curDate;
  public selectedStatus: string[] = [];


  constructor(private ParseUserService: ParseUserService, public CurrencyService: CurrencyService, private AuthService: AuthService) {
    this.curDate = new Date();
  }

  ngOnInit() {
    this.AuthService.getUserObservable().subscribe(_ => {
      this.ParseUserService.getTripHistory().snapshotChanges().pipe(map((changes: any) => {
        return changes.map((trip: any) => ({id: trip.payload.key, ...trip.payload.val()}))
      })).subscribe((tripsHistory: TripHistory[]) => {
        tripsHistory.forEach(trip => {
          if (this.curDate.getTime() < this.getDate(trip.startDate).getTime()) {
            trip.status = "before";
          } else if (this.curDate.getTime() > this.getDate(trip.endDate).getTime()) {
            trip.status = "archival";
          } else {
            trip.status = "active";
          }
        })
        this.trips = tripsHistory;
      });
    });
  }

  public getDate(date: string) {
    return new Date(date);
  }

}
