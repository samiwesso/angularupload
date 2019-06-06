import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  registerForm: FormGroup;
  isSubmitted: boolean = false;


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      addressline: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(3)]
    })
  }

  get formControls() { return this.registerForm.controls }


  register() {
    this.isSubmitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerForm.value).subscribe((registerres) => {
      console.log("registration success: " + registerres["success"])
      if(registerres["success"] === true) {
        console.log("inside register if-statement")
        this.authService.login(this.registerForm.value).subscribe((loginres) => {
          console.log("login success: " + loginres["success"])
          if(loginres["success"]) {
            console.log("inside login if-statement")
            this.router.navigateByUrl('/login');
          }
          else {
            console.log("inside login else-statement")
            this.router.navigateByUrl('/login');
          }         
        })        
      }    
    })
  }
}
