import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { discardPeriodicTasks } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private URL = environment.URL;
  constructor(private http: HttpClient) { }


  public IsValid( id: string ): Promise<any> {
    return this.http.get(this.URL + '/chofer/dispo/' + id, {}).toPromise();
  }


  public getPrevMessages( disco: string ): Promise<any> {
    return this.http.get(this.URL + '/chofer/msg/' + disco, {}).toPromise();
  }
}
