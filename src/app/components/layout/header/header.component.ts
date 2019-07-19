import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showSearchForm: boolean = false;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout(e) {
    e.preventDefault();
    this.authService.logout();
  }

  submitSearch(form) {
    if (form.invalid) return;
    this.router.navigate(['/'], { queryParams: { fType: 'search', fValue: form.value.search } });
  }
}
