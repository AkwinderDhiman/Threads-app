import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CommentFormComponent } from "../comment-form/comment-form.component";
import { CommentService } from '../../services/comment.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Comment } from '../../services/interfaces/comment.interface';

@Component({
  selector: 'app-comment',
  standalone: true,
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  imports: [CommentFormComponent, HttpClientModule,
    RouterModule, CommonModule]
})
export class CommentComponent {
  @Input() comment!: Comment;
  isExpanded = false;
  isReplying = false;

  // constructor(private commentService:CommentService){}

  ngOnInit() {
    console.log('ghfyughuih');
    //  this.commentService.getComments()
  }

  toggleReplying() {
    this.isReplying = !this.isReplying;
    if (this.isReplying) {
      this.isExpanded = true;
    }
  }
  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
