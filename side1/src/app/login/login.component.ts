import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
     private router: Router,
     private cookieService: CookieService,
      private formBuilder: FormBuilder) { }

  loginForm: FormGroup;
  isSubmitted: boolean = false;
  SignedIn: boolean = false;


  // get formControls() { return this.registerForm.controls }
  get f() { return this.loginForm.controls }

  ngOnInit() {
    if(this.cookieService.check('isLoggedIn'))
    {
      this.router.navigateByUrl('/')
    } 

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required, Validators.minLength(3)]]

    })
  }
  

  @Output() public SignedInEvent = new EventEmitter();


  login() {
    this.isSubmitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe((res) => {
      localStorage.setItem("ACCESS_TOKEN", res["token"]);
      localStorage.setItem("USER_ID", res["id"]);
      localStorage.setItem("USER_EMAIL", res["email"]);
      localStorage.setItem("CURRENT_USER", JSON.stringify(res["currentuser"]))

      if(res["success"]) {
        this.cookieService.set('isLoggedIn', 'true', 2)
        this.SignedInEvent.emit('true');
        this.router.navigateByUrl('/profile');
      }

    })  

  }
}
