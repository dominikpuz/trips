import {Component, OnInit} from '@angular/core';
import {ParseUserService} from "../services/parse-user.service";
import {AuthService} from "../services/auth.service";
import {User} from "../models/user.model";
import {map} from "rxjs";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit{

  public users!: User[];
  public persistence!: string;

  constructor(private ParseUserService: ParseUserService, private AuthService: AuthService) {
  }

  ngOnInit(): void {
    this.AuthService.getUserObservable().subscribe((user: any) => {
      if (user.roles.admin) {
        this.ParseUserService.getUsers().snapshotChanges().pipe(map((changes: any) => {
          return changes.map((userData: any) => ({... userData.payload.val()}))
        })).subscribe((users: User[]) => {
          this.users = users;
          this.AuthService.getPersistence().subscribe((persistence: any) => {
            this.persistence = persistence;
          })
        });
      }
    });
  }

  public changeRoleCustomer(value: boolean, uid: string) {
    this.ParseUserService.changeRoles(value, uid, 'customer');
  }

  public changeRoleManager(value: boolean, uid: string) {
    this.ParseUserService.changeRoles(value, uid, 'manager');
  }

  public changeRoleAdmin(value: boolean, uid: string) {
    this.ParseUserService.changeRoles(value, uid, 'admin');
  }

  public banUser(value: boolean, uid: string) {
    this.ParseUserService.banUser(value, uid);
  }

  public setPersistence(persistence: string) {
    this.AuthService.setPersistence(persistence);
  }

}
