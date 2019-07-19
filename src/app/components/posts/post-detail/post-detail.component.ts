import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostReportFormComponent } from './post-report-form/post-report-form.component';
import { PostEditModalComponent } from './post-edit-modal/post-edit-modal.component';
import { PostDeleteModalComponent } from './post-delete-modal/post-delete-modal.component';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../shared/Post';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  public post: Post;
  public postCopyText: string = '';
  constructor(
    public authService: AuthService,
    private modalService: NgbModal,
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postService.find(+params['id']);
      window.scrollTo(0, 0);
    });
    this.postService.fetchedPost.subscribe(
      (post: Post) => {
        this.post = post;
        this.postCopyText = window.location.hostname + '/post/' + this.post.id;
      },
      error => {
        this.post = null;
      }
    );
  }

  openReportModal() {
    const modalRef = this.modalService.open(PostReportFormComponent);
    modalRef.componentInstance.post = this.post;
  }
  openEditModal() {
    const modalRef = this.modalService.open(PostEditModalComponent, { size: 'lg' });
    modalRef.componentInstance.post = this.post;
  }
  openDeleteModal() {
    const modalRef = this.modalService.open(PostDeleteModalComponent);
    modalRef.componentInstance.post = this.post;
  }

  copyToClipboard(input) {
    input.select();
    document.execCommand('copy');
  }

  like() {
    this.postService.like(this.post.id).subscribe(res => {
      this.post.likes++;
      this.post.liked = true;
    });
  }

  unlike() {
    this.postService.unlike(this.post.id).subscribe(res => {
      this.post.likes--;
      this.post.liked = false;
    });
  }
}
