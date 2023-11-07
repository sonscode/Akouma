import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
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
  loggedIn: any
  public user!: SocialUser;

  public teacher = new Teacher()

  constructor(private fb: FormBuilder, private auth_api: AuthApiService, private router: Router, private authService: SocialAuthService) { 
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }

  
  

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      // Handle the user data after a successful login.
      console.log(userData);
    });
    this.loggedIn = true
  }

  signOut(): void {
    this.authService.signOut();
    this.loggedIn=true
  }

  getUser(): SocialUser {
    return this.user;
  }



  
login(){
  // console.log(this.teacher)
  this.auth_api.login(this.teacher)
  .subscribe({
    next: (res:any)=> {
      console.log(res)
      localStorage.setItem('token', res.token)
      this.router.navigate(['/reports']);
      this.loggedIn = true
    },
    error: (err: any) => {
      alert("Login: An error occured!")
      console.log(err)
    }
  })
}



}

/* Google Console Credentials for Social Sign in with Google
Client ID: 443350484173-ilpfjv3727msuclnf18h3n8oaapi67vj.apps.googleusercontent.com
security client code: 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
*/