import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private uid?: string;

  isAuthenticated(){
    return this.uid ? true:false
  }

  getUid(){
    return this.uid
  }

  constructor(private router: Router) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid=user.uid
        console.log("User logged in as ",user.email)
        this.router.navigate(['/store']);
      } else {
        this.uid=undefined
        console.log("User logged out")
      }
    });
  }



  registerUser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log({ user });
        this.router.navigate(['/store']);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert('Something went wrong while signup try again');
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log({ user });
        this.router.navigate(['/store']);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert('Something went wrong while login try again');
      });
  }
  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        this.router.navigate(['/']);
        })
    .catch((error) => {
      alert('Something went wrong while logout');
    });
  }

  googleSignIn(){
    const auth = getAuth();
    const provider=new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?credential.accessToken:null;
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    // IdP data available using getAdditionalUserInfo(result)
    this.router.navigate(['/store']);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
   
  }

  forgotPassword(email:string){
    const auth = getAuth();
      sendPasswordResetEmail(auth,email)
        .then(()=>{
          alert('Password reset email sent');
          // this.router.navigate(['/login']);
        })
        .catch((err)=>{
          console.log(err)
        })
  }

}
