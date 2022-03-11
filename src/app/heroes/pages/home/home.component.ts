import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/auth/interface/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        padding: 10px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  user$!: Observable<Auth | null>;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
