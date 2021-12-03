import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPipe } from './pipes/auth.pipe';
import { HttpClientModule } from '@angular/common/http'


const socketConfig: SocketIoConfig = { url: 'http://192.168.0.56:4500', options: {} };

@NgModule({
  declarations: [AppComponent, AuthPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SocketIoModule.forRoot(socketConfig),
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
