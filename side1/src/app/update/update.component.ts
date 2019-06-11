import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, User } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;
  user = JSON.parse(localStorage.getItem("CURRENT_USER"))

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }
  updateForm: FormGroup;
  isSubmitted: boolean = false;

  ngOnInit() {

    const _currentUser = JSON.parse(localStorage.getItem("CURRENT_USER"))

    this.updateForm = this.formBuilder.group({
      
      firstname: [_currentUser.firstname, Validators.required],
      mellanname: [_currentUser.mellanname, Validators.required],      
      lastname: [_currentUser.lastname, Validators.required],
      birthday:[_currentUser.birthday, Validators.required],
     
      addresslinefaktura: [_currentUser.addresslinefaktura ],
      postnumber:   [_currentUser.postnumber ],
      invoicecity:   [_currentUser.invoicecity ],
      invoicecountry:[_currentUser.invoicecountry ],
      addressline: [_currentUser.addressline],
      zipcode: [_currentUser.zipcode ],
      city: [_currentUser.city ],
      email: [_currentUser.email],
      password: [_currentUser.password ]
    })
  }

  get formControls() { return this.updateForm.controls}

  update(user: User){
    this.isSubmitted = true;
    this.authService.update(this.updateForm.value).subscribe(res => {
      console.log("får tillbaka: " + res)
      
      //this.user = res;
    });
  }

}
