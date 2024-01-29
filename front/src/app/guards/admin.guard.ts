import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){};
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
        var loggedInUser = this.authService.getUserObservable().value;
        let isLoggedIn = loggedInUser !== null && loggedInUser.role === "Admin";
        if (isLoggedIn){
            return true
        } else {
            this.router.navigate(['/']);
        }

        return false;
      }

}
