import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Device } from '@capacitor/device';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor( private apiService: ApiService, private router: Router ){}
  
  
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean> {

    
      try {
        
        const info = await Device.getId();
    
        const data = await this.apiService.IsValid(info.uuid);
        localStorage.setItem('chofer', JSON.stringify(data.chofer));
        
        if( data.ok ) {
          return true;
        } else {
          this.router.navigateByUrl('/register')
          return false;
        }
      } catch (error) {
        this.router.navigateByUrl('/register')
        return false;
      }

    


  }

  
}
