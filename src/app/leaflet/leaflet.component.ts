import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  latLng,
  MapOptions,
  Map,
  tileLayer,
  geoJSON,
} from 'leaflet';
import {AppService} from "../service/app.service";
import {Casualties} from "../model/Casualties";

@Component({
  selector: 'app-leaflet',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss']
})
export class LeafletComponent implements OnInit {
  public mapOptions: MapOptions  | any;
  private joinedData: any = [];
  private map: Map | any;
  @Output() chartDataVisual = new EventEmitter();
  @Output() changes: EventEmitter<any> = new EventEmitter<any>();
  @Output() polyClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectedPoly: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private appService: AppService) {
  }

  async ngOnInit() {
    this.initializeMapOptions();
    this.getJoinedData();
  }

  private initializeMapOptions() {
    this.mapOptions = {
      center: latLng(52.175605, 5.349898),
      zoom: 10,
      layers: [
        tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            maxZoom: 18,
            attribution: 'Map data © OpenStreetMap contributors'
          })
      ],
    };
  }

  private getJoinedData() {
    this.appService.getJoinedData().subscribe((data) => {
      this.joinedData = data;
    });
  }

  onMapReady(map: Map) {
    this.map = map;
    setTimeout(() => {
      this.addPolygonToMap();
    }, 1000);

  }

  private addPolygonToMap() {
    for (const x in this.joinedData) {
      if (this.joinedData.hasOwnProperty(x)) {
        this.chartDataVisual.next(
          {
            label: this.joinedData[x].name,
            value: this.joinedData[x].casualtiesData.incidents
          });

        const geoJson = geoJSON(this.joinedData[x].geometry, {
          style: {
            color: this.joinedData[x].color,
            weight: 2,
            opacity: 0.65
          }
        }).addTo(this.map);
        const centerPoint: any = [];
        geoJson.eachLayer((layer) => {
          layer.bindPopup(`<span> ${ this.joinedData[x].name }</span>`);
          layer.on('click', (e) => {
            this.selectedPolygonData(x);
            this.polyClicked.emit(true);
            const popup = e.target.getPopup();
            popup.setLatLng(latLng(centerPoint[0][1], centerPoint[0][0])).openOn(this.map);
          });
          centerPoint.push(this.getCenterPointLatLon(this.joinedData[x].geometry.coordinates[0]));
        });
      }
    }
  }

  private selectedPolygonData(x: string) {
    const valueData: any = [];
    this.joinedData[x].casualtiesData.filter((Cdata: Casualties) => valueData.push([new Date(Cdata.year).getTime(), Cdata.deaths, Cdata.name = this.joinedData[x].name]));
    this.changes.emit(valueData);
  }

  private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private getCenterPointLatLon(arr: any) {
    let twoTimesSignedArea = 0;
    let cxTimes6SignedArea = 0;
    let cyTimes6SignedArea = 0;

    const length = arr.length;

    const x = (i: any) => arr[i % length][0];
    const y = (i: any) => arr[i % length][1];

    for (let i = 0; i < arr.length; i++) {
      const twoSA = x(i) * y(i + 1) - x(i + 1) * y(i);
      twoTimesSignedArea += twoSA;
      cxTimes6SignedArea += (x(i) + x(i + 1)) * twoSA;
      cyTimes6SignedArea += (y(i) + y(i + 1)) * twoSA;
    }
    const sixSignedArea = 3 * twoTimesSignedArea;
    return [cxTimes6SignedArea / sixSignedArea, cyTimes6SignedArea / sixSignedArea];
  }
}
