import { Component, OnInit } from '@angular/core';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ihb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NgbPaginationConfig]
})
export class DashboardComponent implements OnInit {
  faUser = faUser;
  faBell = faBell;

  result: {id: string, roles: string[]};

  constructor(
    private authService: AuthService,
    private router: Router,
    private paginationConfig: NgbPaginationConfig
  ) { }

  ngOnInit() {
    this.paginationConfig.rotate = true;
    this.paginationConfig.boundaryLinks = true;
    this.paginationConfig.maxSize = 5;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
