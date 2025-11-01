import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AirQualityComponent } from '../components/air-quality/air-quality.component';
import { WeatherSummaryComponent } from '../components/weather-summary/weather-summary.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, AirQualityComponent, WeatherSummaryComponent,],
})
export class Tab1Page {
  constructor() { }
}
