import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class DataService {



  private airQualityData = new BehaviorSubject<any[]>([]); // for air quality component
  private messageSource = new BehaviorSubject<string>(''); // for  detail to tab2
  private EmissionData = new BehaviorSubject<any[]>([]); // for emission component

  currentMessage = this.messageSource.asObservable();
  airQualityData$ = this.airQualityData.asObservable();
  EmissionData$ = this.EmissionData.asObservable();

  get airQualityDataValue() {
    return this.airQualityData.getValue();
  }

  get EmissionDataValue() {
    return this.EmissionData.getValue();
  }

  constructor(private http: HttpClient) {


    // for air quality data
    const jsonUrl = 'assets/data/airQuality.json';

    this.http.get<any>(jsonUrl).subscribe({
        next: (data) => {
          const entries = Array.isArray(data.entry) ? data.entry : [data.entry];
          this.airQualityData.next(entries);
        },
        error: (err) => {
          console.error('Error loading JSON:', err);
          }
        });

        // for emission data
    const jsonUrl2 = 'assets/data/ontario.json';
    this.http.get<any>(jsonUrl2).subscribe({
        next: (data) => {
          console.log("Emission Data in Service: ", data);
          this.EmissionData.next(data);
        },
        error: (err) => {
          console.error('Error loading JSON:', err);
          }
        });

  }

  sendMessage(message: string) {
    this.messageSource.next(message);
  }
}
