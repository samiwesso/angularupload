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

  constructor(private authService: AuthService, private router: Router,private cookieService: CookieService, private formBuilder: FormBuilder) { }

  loginForm: FormGroup;
  isSubmitted: boolean = false;
  SignedIn: boolean = false;

  get formControls() { return this.loginForm.controls }

  ngOnInit() {
    if(this.cookieService.check('isLoggedIn'))
    {
      this.router.navigateByUrl('/')
    } 

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]

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



// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';
// import { AuthService, User } from '../auth.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit {

//   currentUser: User;
//   currentUserSubscription: Subscription;
//   users: User[] = [];

//   constructor(
//     private authService: AuthService,
//     private router: Router,
//      private cookieService: CookieService
//      ) { }
  
//   isLoggedIn: boolean = this.cookieService.check('isLoggedIn')

//   ngOnInit() {

//   }

//   logout() {
//     this.isLoggedIn = false;
//     this.cookieService.deleteAll()
//     this.router.navigateByUrl('/')
//     // localStorage.removeItem('ACCESS_TOKEN');
//     // localStorage.removeItem('USER_ID');
//     // localStorage.removeItem('USER_EMAIL');
//   }

// }


