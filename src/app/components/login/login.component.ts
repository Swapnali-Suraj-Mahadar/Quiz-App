import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

//import userData from '../../assets/userdata/userdetails.json'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userDetails: any;
  userName: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router,
    private httpClient: HttpClient, private authService: AuthService) { }

  userLoginForm: FormGroup = new FormGroup({

    email: new FormControl(''),
    password: new FormControl(''),

  });

  ngOnInit(): void {
    this.loadUserData().subscribe((result: any) => {
      this.userDetails = result;
      console.log(result);
    });
    this.userLoginForm = this.formBuilder.group(
      {

        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40),
          ],
        ],

      },

    );
  }


  get email() {
    return this.userLoginForm.controls['email'];
  }

  get password() {
    return this.userLoginForm.controls['password'];
  }

  onLogin() {

    const loginFormValue = this.userLoginForm.value;

    if (this.userDetails != null) {

      const isUserFound = this.userDetails.find((m: any) => m.emailId == loginFormValue.emailId && m.password == loginFormValue.password);


      if (isUserFound != undefined) {

        this.userName = isUserFound.userName;
        console.log('userName', this.userName);
        this.router.navigateByUrl('categories');
      }
      else {
        alert("user name or pssword is wrong");
      }
    }
    else {
      alert("User is not present");
    }
    this.authService.login(this.userName);
  }




  public loadUserData(): Observable<any> {
    return this.httpClient.get("../../../assets/userdata/userdetails.json")
  }
}
