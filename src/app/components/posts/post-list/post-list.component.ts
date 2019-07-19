import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../shared/Post';
import { PostService } from '../../../services/post.service';
import { Paginated } from '../../../shared/Paginated';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public links = { prev: null, next: null };
  public subs = new Subject();

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.postService.fetchedPosts.takeUntil(this.subs).subscribe((res: Paginated<Post>) => {
      this.posts = res.data;
      this.links = res.links;
    });
    this.route.queryParams.subscribe(params => {
      this.postService.all(null, params);
    });
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  paginatePrev() {
    window.scrollTo(0, 0);
    this.postService.all(this.links.prev);
  }

  paginateNext() {
    window.scrollTo(0, 0);
    this.postService.all(this.links.next);
  }
}
