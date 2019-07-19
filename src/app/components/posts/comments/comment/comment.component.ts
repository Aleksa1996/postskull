import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentDeleteModalComponent } from '../comment-delete-modal/comment-delete-modal.component';
import { CommentEditModalComponent } from '../comment-edit-modal/comment-edit-modal.component';
import { Comment } from '../../../../shared/Comment';
import { AuthService } from '../../../../services/auth.service';
import { CommentService } from '../../../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  constructor(public authService: AuthService, private commentService: CommentService, private modalService: NgbModal) {}
  ngOnInit() {}

  like() {
    this.commentService.like(this.comment.id).subscribe(res => {
      this.comment.likes++;
      this.comment.liked = true;
    });
  }
  unlike() {
    this.commentService.unlike(this.comment.id).subscribe(res => {
      this.comment.likes--;
      this.comment.liked = false;
    });
  }

  openEditModal() {
    const modalRef = this.modalService.open(CommentEditModalComponent);
    modalRef.componentInstance.comment = this.comment;
  }
  openDeleteModal() {
    const modalRef = this.modalService.open(CommentDeleteModalComponent);
    modalRef.componentInstance.comment = this.comment;
  }
}
