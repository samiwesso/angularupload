import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
     private cookieService: CookieService) { }
  
  isLoggedIn: boolean = this.cookieService.check('isLoggedIn')
  user = {};
  SignedIn:boolean =false;

  ngOnInit() {
this.user = JSON.parse(localStorage.getItem("CURRENT_USER"))
if(this.user)(
  this.SignedIn = true
)
  }

  logout() {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('USER_EMAIL');
    localStorage.removeItem('CURRENT_USER');
    this.cookieService.deleteAll()
    this.router.navigateByUrl('/')
  }

}
