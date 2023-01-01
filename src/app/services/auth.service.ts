import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {updateProfile} from "@angular/fire/auth";
import {User} from "../models/user.model";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {BehaviorSubject, of, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private angularFireAuth: AngularFireAuth, private router: Router,
              private angularFireDatabase: AngularFireDatabase) {
    this.angularFireAuth.authState
      .pipe(switchMap(user => user ? this.angularFireDatabase.object("users/" + user.uid).valueChanges() : of(false)))
      .subscribe(userData => this.userSubject.next(userData));
  }

  public getUser() {
    return this.userSubject.value;
  }

  public getUserObservable() {
    return this.angularFireAuth.authState
      .pipe(switchMap(user => user ? this.angularFireDatabase.
      object("users/" + user.uid).valueChanges() : of(false)));
  }

  public authState() {
    return this.angularFireAuth.authState;
  }

  public login(email: string, password: string) {
    this.getPersistence().subscribe((persistence: any) => {
      this.angularFireAuth.setPersistence(persistence).then(() => {
        this.angularFireAuth.signInWithEmailAndPassword(email, password).then(() => {
          this.angularFireAuth.authState.subscribe(user => {
            this.angularFireDatabase.object('users/' + user!.uid).valueChanges().subscribe((userData: any) => {
              this.router.navigate(['/home']);
            });
          });
        }).catch(error => {
          window.alert(error.message);
        });
      });
    });
  }

  public signOut() {
    this.angularFireAuth.signOut().then(() => {
      this.router.navigate(['/home']);
    })
  }

  public register(email: string, password: string, displayNme: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(data => {
      updateProfile(data.user!, {displayName: displayNme}).then(() => {
        this.setUserData(data.user).then(() => {
          this.router.navigate(['home']);
        });
      })
    }).catch(error => {
      window.alert(error.message);
    });
  }

  private setUserData(result: any): Promise<void> {
    const userRef = this.angularFireDatabase.object("users/" + result.uid);
    const user: User = {
      id: result.uid,
      banned: false,
      name: result.displayName,
      email: result.email,
      roles: {
        guest: true,
        customer: true,
      },
    };
    return userRef.update(user);
  }

  public isLoggedIn(): boolean{
    return !!this.userSubject.value;
  }

  public getPersistence() {
    return this.angularFireDatabase.object('settings/persistence').valueChanges();
  }

  public setPersistence(persistence: string) {
    return this.angularFireDatabase.database.ref('settings').child('persistence').set(persistence);
  }

}
