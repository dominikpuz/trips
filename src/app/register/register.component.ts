import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private AuthService: AuthService) {
  }

  public onSubmit(form: NgForm) {
    this.AuthService.register(form.value.email, form.value.password, form.value.nickname);
  }
}
