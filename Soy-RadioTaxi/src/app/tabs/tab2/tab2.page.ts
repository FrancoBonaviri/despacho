import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  messageList = [1,2,3,4,5,6,7,8,9];
  discos = [];
  messages = [];
  @ViewChild(IonContent, { static: false }) content: IonContent;

  constructor(private messageService: MessagesService, private apiService: ApiService) {}

  async ngOnInit() {
    
    const chofer = JSON.parse(localStorage.getItem('chofer'));
    this.discos = chofer?.NumeroDiscos || [];
    

    if( this.discos?.length > 0 ) {
      
      this.onChangeDisco( {target: { value : this.discos[0] } } )
    }
  
  }

  getMessages( disco ) {
      this.messageService.getMessages(disco).subscribe( data => {
      const audio = new Audio('../../../assets/sound/notificacion.mp3')
      audio.play();
      this.messages = [ ...this.messages, data ]
      this.ScrollToBottom();
    })
  }


  ScrollToBottom() {
    this.content.scrollToBottom(1000);
  }


  async onChangeDisco({target}) {
    
    this.messages = [];
    const res = await this.apiService.getPrevMessages(target.value);
    this.messages = [ ...res.messages];
    this.ScrollToBottom();
    this.getMessages(target.value);
  }

}
