import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private AuthService: AuthService) {
  }

  public onSubmit(form: NgForm) {
    this.AuthService.login(form.value.email, form.value.password);
  }

}
