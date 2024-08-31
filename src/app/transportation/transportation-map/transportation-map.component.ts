import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { any } from 'ramda';
import { TransportationService } from '@app/core';

@Component({
	selector: 'app-transportation-map',
	templateUrl: './transportation-map.component.html',
	styleUrls: ['./transportation-map.component.css'],
})
export class TransportationMapComponent implements AfterViewInit {
	private map: L.Map;
	private geopolygons: L.GeoJSON<any>;

	constructor(private transportationService: TransportationService) {}

	ngAfterViewInit(): void {
		this.initMap();
		this.addLayer();
	}

	private initMap(): void {
		this.map = L.map('map', {
			center: [51.4489, 7.0148],
			zoom: 9,
		});

		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 15,
			attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		});

		tiles.addTo(this.map);
	}

	private addLayer() {
		this.transportationService.getTransportationMapData().subscribe((res) => {
			//this.geolines = res["geolines"];
			//this.geopoints=res["geopoints"];

			var myObject = JSON.parse(res['geopolygons']);
			var myLayer = L.geoJSON().addTo(this.map);
			myLayer.addData(myObject);
			/*
			L.geoJSON(myObject, {
				
				style: (feature) => ({
					weight: 3,
					opacity: 0.5,
					color: '#008f68',
					fillOpacity: 0.8,
					fillColor: '#6DB65B',
				})
				
	  })
	  */
			//this.geomultilinestrings= res["geomultilinestrings"];

			//L.geoJSON(this.geolines).addTo(this.trsMap);
			//L.geoJSON(this.geopoints).addTo(this.trsMap);
			//this.map.addLayer(this.geopolygons);
		});
	}

	/*
  summit = L.marker([ 51.4472,7.0175 ], {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 41 ],
      iconUrl: 'leaflet/marker-icon.png',
      iconRetinaUrl: 'leaflet/marker-icon-2x.png',
      shadowUrl: 'leaflet/marker-shadow.png'
    })
  });
*/
}
