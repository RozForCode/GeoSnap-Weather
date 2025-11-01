import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../data-service';

@Component({
  selector: 'app-air-quality',
  templateUrl: './air-quality.component.html',
  styleUrls: ['./air-quality.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class AirQualityComponent implements OnInit {

  searchTerm: string = '';

  aqhiEntries: any[] = [];
  originalEntries: any[] = [];

  constructor(private airQualityComponent:DataService) {
  }

  ngOnInit() {
    this.airQualityComponent.airQualityData$.subscribe((entries) => {
      this.aqhiEntries = entries;
      this.originalEntries = [...entries];
      console.log("Air Quality Data in Component: ", this.aqhiEntries);
    });
  }

  filterEntries() {
    const term = this.searchTerm.trim().toLowerCase();

  if (!term) {
    this.aqhiEntries = [...this.originalEntries];
    return;
  }

  this.aqhiEntries = this.originalEntries.filter((entry) => {
    console.log(entry.title);
    // let title = entry.title?.__cdata.toString().trim().toLowerCase()
    // ;
    let title = entry.title.__cdata ? entry.title.__cdata.toString().trim().toLowerCase() : entry.title.toString().trim().toLowerCase();
    console.log(title);
    console.log("Filtering with title:", title);
    title = title.toLowerCase();
    return title.startsWith(term);
  });

  }
}

// json converted from xml data that was downloaded from - https://www.airqualityontario.com/press/xml_summary.php