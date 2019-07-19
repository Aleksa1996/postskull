import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.userService.all().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  deleteUser(id) {
    this.userService.destroyByAdmin(id).subscribe(res => {
      this.users = this.users.filter(s => s.id != id);
    });
  }
}
