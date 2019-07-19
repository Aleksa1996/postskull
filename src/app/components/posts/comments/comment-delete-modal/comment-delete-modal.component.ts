import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from '../../../../services/comment.service';
import { Comment } from '../../../../shared/Comment';

@Component({
  selector: 'app-comment-delete-modal',
  templateUrl: './comment-delete-modal.component.html',
  styleUrls: ['./comment-delete-modal.component.scss']
})
export class CommentDeleteModalComponent implements OnInit {
  @Input() comment: Comment;
  constructor(public activeModal: NgbActiveModal, public commentService: CommentService) {}

  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }

  deleteComment() {
    this.commentService.destroy(this.comment);
    this.activeModal.close();
  }
}
