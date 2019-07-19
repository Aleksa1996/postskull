import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../../../shared/Comment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from '../../../../services/comment.service';

@Component({
  selector: 'app-comment-edit-modal',
  templateUrl: './comment-edit-modal.component.html',
  styleUrls: ['./comment-edit-modal.component.scss']
})
export class CommentEditModalComponent implements OnInit {
  @Input() comment: Comment;
  public body: string;
  constructor(public activeModal: NgbActiveModal, public commentService: CommentService) {}

  ngOnInit() {
    this.body = this.comment.body;
  }

  closeModal() {
    this.activeModal.close();
  }

  editComment() {
    if (this.body.length == 0) return;
    this.commentService.update({ ...this.comment, body: this.body });
    this.activeModal.close();
  }
}
