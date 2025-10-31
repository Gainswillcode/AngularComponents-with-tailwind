import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-map-lglg',
  standalone: true,
  imports: [],
  templateUrl: './modal-map-lglg.component.html',
  styleUrl: './modal-map-lglg.component.scss'
})
export class ModalMapLglgComponent implements AfterViewInit{

   @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<{ lat: number; lng: number }>();

  private map!: L.Map;
  private marker!: L.Marker;

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    this.map = L.map('map', {
      center: [4.05, 9.7], // exemple: Douala
      zoom: 6
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      this.setMarker(lat, lng);
    });
  }

  private setMarker(lat: number, lng: number) {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker([lat, lng]).addTo(this.map);
  }

  confirmSelection() {
    if (this.marker) {
      const coords = this.marker.getLatLng();
      this.select.emit({ lat: coords.lat, lng: coords.lng });
      this.close.emit();
    }
  }

  cancel() {
    this.close.emit();
  }

}
