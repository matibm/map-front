import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  constructor() {

  }

  private map: any;

  private initMap(): void {


    let map = L.map('map', {
      center: [-27.3292479, -55.8669718],
      zoom: 16
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(map);



    window.addEventListener("message", (event) => {
      console.log(event);
      let pointSelected: any
      if (event.origin !== window.location.origin) {
        const data = JSON.parse(event.data)

        if (data.eventType == 'set_point') {
          
          map.addEventListener('click', (e) => {
            console.log(e);
            if (pointSelected) {
              pointSelected.remove()
            }
            pointSelected = L.marker(e.latlng).addTo(map)

            window.top!.postMessage(e.latlng, '*')

          })
        } else {

          console.log(JSON.parse(event.data));
          const places = JSON.parse(event.data)
          places.forEach((place: any) => {

            // var popup = L.popup()
            // .setLatLng(place.location.coordinates)
            // .setContent(place.name)
            // .openOn(map);
            L.marker(place.location.coordinates).addTo(map);
          });
        }

      }
    }, false);
  }
  ngAfterViewInit(): void {
    this.initMap();
  }

  setPoint(e: MessageEvent, map: L.Map) {


  }
}
