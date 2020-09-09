import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { default as olMap } from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { FullScreen, defaults as defaultControls } from 'ol/control';
import { Router } from '@angular/router';
import * as olExtent from 'ol/extent';

@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements OnInit {

  private map: olMap;

  private _markers = new ReplaySubject();
  private fullScreenControl: FullScreen;
  private mapIsFullScreen: boolean;
  private markerPoints = [];
  private markerLayer = [];


  @ViewChild('mapTarget', {static: true}) mapTarget: ElementRef;

  @Output() markerClick = new EventEmitter();

  @Input() center: string;

  private static setCircleColor(point, style) {
    const feature = new Feature({
      labelPoint: new Point(point),
      name: 'My Polygon'
    });

    feature.setGeometryName('labelPoint');

    feature.setStyle(style);
    return feature;
  }

  @Input() set markers(markers: any[]) {
    if (markers && markers.length > 0) {
      this._markers.next(markers);
    }
  }

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.mapIsFullScreen = false;
    this.initMap();

    this._markers.subscribe((markers: any[]) => {
      for (const m of this.markerLayer) {
        this.map.removeLayer(m);
      }

      this.setMarkersOnMap(markers);
    });
  }

  private initMap() {
    this.fullScreenControl = new FullScreen();
    this.map = new olMap({
      controls: defaultControls().extend([this.fullScreenControl]),
      layers: [
        new TileLayer({source: new OSM()})
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      }),
      target: this.mapTarget.nativeElement
    });

    this.map.on('click', (evt) => {
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feat, layer) => {
        // you can add a condition on layer to restrict the listener
        return feat;
      });

      if (feature) {
        this.router.navigateByUrl('/page-after-marker-click');
      }
    });
  }

  private async setMarkersOnMap(markers) {
    this.markerPoints = [];
    for (const marker of markers) {
      const source = new VectorSource({});
      const layer = new VectorLayer({source});
      this.markerLayer.push(layer);
      this.map.addLayer(layer);

      const coordinate = fromLonLat([marker.long, marker.lat]);
      this.markerPoints.push(coordinate);
      const feature = new Feature({
        geometry: new Point(coordinate)
      });

      if (marker.clickData) {
        feature.set('clickData', marker.clickData);
      }

      feature.setStyle(new Style({
        image: new Icon({
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          opacity: 1,
        })
      }));

      source.addFeature(feature);
    }
    this.centerMap(this.markerPoints);
  }

  private centerMap(coordinates?) {
    const ext = olExtent.boundingExtent(coordinates);
    this.map.getView().fit(ext, {minResolution: 10, size: this.map.getSize(), padding: [30, 30, 30, 30]});
  }
}
