import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user: User = new User();
  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.find(+params['id']).subscribe((user: User) => {
        this.user = user;
        console.log(user);
      });
      window.scrollTo(0, 0);
    });
  }
}
