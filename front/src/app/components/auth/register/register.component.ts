import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    name: null,
    lastName: null,
    username: null,
    jmbg: null,
    email: null,
    password: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { name, lastName, email, password, repeatedPassword, state, city, job, phone } = this.form;

    if (password !== repeatedPassword) {
      alert("Lozinke se ne poklapaju!")
      return;
    }

    this.authService.register(
        {
           firstName:name,
           lastName, 
           email,
           password,
           state,
           job,
           phone,
           city
        }).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
