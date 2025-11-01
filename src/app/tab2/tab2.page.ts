import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AirQualityComponent } from '../components/air-quality/air-quality.component';
import { DecimalPipe } from '@angular/common';
import { MatTableModule, MatTableDataSource,  } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { DataService } from '../data-service';

export interface FacilityRecord {
  year: number;
  facilityName: string;
  facilityCity: string;
  totalCO2e: number;
  reportingAmount: string;
  verificationBody: string;
}




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, AirQualityComponent,MatRadioModule, MatTableModule, DecimalPipe]
})
export class Tab2Page {

  receivedMessage: string = '';



  dataSource = new MatTableDataSource<FacilityRecord>([]);
  selectedRecord: FacilityRecord | null = null;
  
  constructor(private router:Router, private dataService:DataService) {
    
    dataService.EmissionData$.subscribe(data => {
      console.log("Emission Data in Tab2: ", data);
      const records: FacilityRecord[] = data.map(item => ({
        year: item['Year'],
        facilityName: item['Facility Name'],
        facilityCity: item['Facility City'],
        totalCO2e: item['Total CO2e from all sources in CO2e (t)'],
        reportingAmount: item['Reporting Amount in CO2e (t)'],
        verificationBody: item['Accredited Verification Body']
      }));
      this.dataSource.data = records;
    });


    this.dataService.currentMessage.subscribe(msg => {
      if(msg){
        this.receivedMessage = msg;
        console.log("Received message in Tab2: ", this.receivedMessage);
      }
    });

  }

  displayedColumns: string[] = [
    'select', 
    'year',
    'facilityName',
    'facilityCity',
    'totalCO2e',
    'reportingAmount',
    'verificationBody'
  ];


  onSelect(record: FacilityRecord) {
    console.log('Selected:', record);
    this.selectedRecord = record;
  }

  gotoDetailsPage(){
    this.router.navigate(['/details'], 
      { 
        state: {record:this.selectedRecord } 
      }
    );
  }

}
