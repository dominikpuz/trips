import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of, switchMap} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {

  constructor(private AuthService: AuthService, private router: Router, private angularFireDatabase: AngularFireDatabase) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.AuthService.authState().pipe(switchMap(user => user ? this.angularFireDatabase.object("users/" + user.uid).valueChanges() : of(false)))
      .subscribe((userData: any) => {
        if (userData && !userData.roles.manager) {
          this.router.navigate(['/home']);
        }
      });
    return true;
  }

}
