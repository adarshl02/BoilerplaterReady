import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../firebaseConfig';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
 initializeApp(firebaseConfig)
  }

  showNavbar = true;

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.showNavbar = this.router.url !== '/';
    });
  }
}
