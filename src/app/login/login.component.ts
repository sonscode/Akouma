import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';
import { Teacher } from '../teacher';
import { SubjectCodeDialogComponent } from '../subject-code-dialog/subject-code-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  googleSignInService: any;
  httpClient: any;
  
  constructor(private fb: FormBuilder, private auth_api: AuthApiService, private router: Router, private authService: SocialAuthService, public dialog: MatDialog) { 
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
  
  
  
  
  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
  //     // Handle the user data after a successful login.
  //     console.log(userData);
  //   });
  //   this.loggedIn = true
  // }
  async signInWithGoogle(): Promise<void> {
    // Assume you have a method like googleSignInService.signIn() for Google Sign-In
    const googleUser = await this.googleSignInService.signIn();
  
    // Extract necessary information from the Google user object if needed
    const userEmail = googleUser.getBasicProfile().getEmail();
  
    // Open the subject code dialog and wait for the result
    const subjectCode = await this.openSubjectCodeDialog(userEmail);
  
    if (subjectCode !== null) {
      // Subject code provided, proceed with your logic
      this.handleSubjectCode(userEmail, subjectCode);
    } else {
      // User canceled or closed the dialog, handle accordingly
    }
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
  
  
  openSubjectCodeDialog(userEmail: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const dialogRef = this.dialog.open(SubjectCodeDialogComponent, {
        width: '300px',
        data: { userEmail: userEmail },
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // User clicked Submit in the dialog
          resolve(result);
        } else {
          // User clicked Cancel or closed the dialog
          resolve(null);
        }
      });
    });
  }

  handleSubjectCode(userEmail: string, subjectCode: string): void {
    // Your logic to handle the subject code
    // For example, you might want to send the userEmail and subjectCode to your server for validation
  
    // Make an API call to your server for validation
    // You can use Angular's HttpClient for this purpose
    // Replace '/validateSubjectCode' with the actual API endpoint on your server
    this.httpClient.post('/validateSubjectCode', {
      userEmail: userEmail,
      subjectCode: subjectCode,
    })
    .subscribe(
      (data: any) => {
        // Handle the response from the server
        console.log(data);
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  
  
}

/* Google Console Credentials for Social Sign in with Google
Client ID: 443350484173-ilpfjv3727msuclnf18h3n8oaapi67vj.apps.googleusercontent.com
security client code: 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
*/