import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';
import { Teacher } from '../teacher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  exform!: FormGroup;
  info!: any;
user: any;
loggedIn: any

  public teacher = new Teacher()

  constructor(private fb: FormBuilder, private auth_api: AuthApiService, private router: Router, private authService: SocialAuthService) { }



  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    
  }

  signOut(): void {
    this.authService.signOut();
  }



  
login(){
  // console.log(this.teacher)
  this.auth_api.login(this.teacher)
  .subscribe({
    next: (res:any)=> {
      console.log(res)
      localStorage.setItem('token', res.token)
      this.router.navigate(['/marks']);
    },
    error: (err: any) => {
      alert("Login: Wrong uername or password!")
      console.log(err)
    }
  })
}



}
