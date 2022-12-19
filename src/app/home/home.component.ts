import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  zoom = 14;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    disableDefaultUI: true,
    minZoom: 14,
    maxZoom: 18
  };

  ngOnInit() {
    this.center = {
      lat: 52.240676,
      lng: 21.076400,
    };
  }

}
