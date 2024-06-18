import {  Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home2',
  standalone: true,
  imports: [LoginComponent, SignupComponent,CommonModule],
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
      })),
      transition(':enter, :leave', [
        animate(300)
      ]),
    ]),
  ]
})
export class Home2Component {
  isLoginVisible = false;
  isRegisterVisible = false;

  showLogin(event:Event) {
    this.isLoginVisible = true;
    this.isRegisterVisible = false;
    event.stopPropagation(); // Prevents the event from bubbling up to the container
  }

  showRegister(event:Event) {
    this.isLoginVisible = false;
    this.isRegisterVisible = true;
    event.stopPropagation(); // Prevents the event from bubbling up to the container
  }
  onContainerClick(event: Event) {
    
    this.isLoginVisible = false;
    this.isRegisterVisible = false;
  }
}
