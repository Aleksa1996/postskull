import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from '../../../../shared/Post';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-post-report-form',
  templateUrl: './post-report-form.component.html',
  styleUrls: ['./post-report-form.component.scss']
})
export class PostReportFormComponent implements OnInit {
  @Input() post: Post;
  public reportCategories: string[] = ['Spam', 'Pornography', 'Hatred', 'Violent', 'Naaah, i dont like it'];
  public reportCategory = null;
  constructor(public activeModal: NgbActiveModal, private postService: PostService) {}

  ngOnInit() {}

  closeModal() {
    this.activeModal.close();
  }

  reportPost() {
    if (!this.reportCategory) return;

    this.postService.report({ reason: this.reportCategory, post_id: this.post.id }).subscribe(res => {
      this.activeModal.close();
    });
  }
}
