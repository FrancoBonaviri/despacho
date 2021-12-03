import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    allowSlideNext: false,
    allowSlidePrev: false
  };

  id = '';
  constructor() { }

  async ngOnInit() {

    const info = await Device.getId();

    this.id = info.uuid;
    
  }



  share() {
    console.log('holaa');
  }

}
