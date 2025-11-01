import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonItem, IonInput } from '@ionic/angular/standalone';
import { DecimalPipe } from '@angular/common';
import { DataService } from '../../data-service';
import { AirQualityComponent } from 'src/app/components/air-quality/air-quality.component';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [AirQualityComponent,FormsModule, IonContent, IonHeader,IonInput, IonToolbar, CommonModule, FormsModule,IonItem, IonTitle,IonButton, DecimalPipe, IonLabel]
})
export class DetailsPage implements OnInit {

  messageText: string = '';
  photo: string = '';
  constructor(private router: Router, private messageService:DataService) { }

  selectedData: any;
  ngOnInit() {

    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state) {
      this.selectedData = nav.extras.state;
    }
    console.log('Received data:', this.selectedData);
  }

  gotoTab2(){
    this.messageService.sendMessage(
      `
  <p><strong>Details sent to the User:</strong></p>
  <pre>${JSON.stringify(this.selectedData, null, 2)}</pre>
  <p><strong>User's Comment about the data:</strong> <span style="color:red">${this.messageText}</span></p>
  <p>User Image:</p>
  <img src="${this.photo}" style="max-width: 100%; border-radius: 10px;">
  `
    );
    this.router.navigate(['/tabs/tab2']);
  }
  
async takePhoto() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64, // Base64 for displaying easily
      source: CameraSource.Camera,
    });
    this.photo = `data:image/jpeg;base64,${image.base64String}`;
  } catch (err) {
    console.error('Error taking photo:', err);
  }
}

}

// this page will display data from the following resource - https://data.ontario.ca/en/dataset/greenhouse-gas-emissions-reporting-by-facility/resource/0996bfd9-ed27-4f78-8ed1-9e024185f10a
// "User's comment about the following details sent to the details page <br> Details sent: " + JSON.stringify(this.selectedData)
  // +"<br> Comment: " + this.messageText
// the data was converted from CSV to JSON using the following tool - https://csvjson.com/csv2json
