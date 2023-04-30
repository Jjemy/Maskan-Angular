import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: AdminService, private router: Router) { }

  model: any = {};
  errorMsg = "";

  login() {
    console.log(this.model);
    this.service.login(this.model).subscribe(
      () => {
        this.router.navigate(['']);
      }, (error) => {
        if (error.error.toString() == "[object Object]") {
          this.errorMsg = "Email or password is not correct"
        } else {
          this.errorMsg = error.error;
        }
      })
  }
}
