import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, User } from '../auth.service';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadAllUsers();
}
ngOnDestroy() {
  // unsubscribe to ensure no memory leaks
  this.currentUserSubscription.unsubscribe();
}
deleteUser(_id: number) {
  this.authService.delete(_id).pipe(first()).subscribe(() => {
      this.loadAllUsers()
  });
}
private loadAllUsers() {
  this.authService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
  });
}

  // logout()
  // {
  //   this.authService.logout();
  //   this.router.navigateByUrl('/');
  // }



}
