import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currency = "$";

  constructor() { }

  public getCurrency(): string {
    return this.currency;
  }

  public setCurrency(currency: string) {
    this.currency = currency;
  }

}
