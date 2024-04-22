import { CommonModule } from '@angular/common';
import { Component, Input, effect, signal } from '@angular/core';
import { CommentFormComponent } from "../comment-form/comment-form.component";
import { CommentService } from '../../services/comment.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Comment } from '../../services/interfaces/comment.interface';
import { UserService } from '../../services/user.service';

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
  isExpanded = signal(false);
  isReplying = signal(false);
  nestedComment = signal<Comment[]>([])

  constructor(private commentService: CommentService, private userService: UserService) { }

  nestedCommentsEffect = effect(() => {
    if (this.isExpanded()) {
      this.commentService.getComments(this.comment._id).subscribe(comments => {
        this.nestedComment.set(comments)
      })
    }
  })


  toggleReplying() {
    this.isReplying.set(!this.isReplying());
    if (this.isReplying()) {
      this.isExpanded.set(true);
    }
  }
  toggleExpanded() {
    this.isExpanded.set(!this.isExpanded());
  }
  createComment(formValues: { text: string }) {
    const { text } = formValues;
    let user = this.userService.getUserFromStorage();
    if (!user) {
      return;
    }
    this.commentService.createComment({
      text,
      userId: user['_id'],
      parentId: this.comment._id
    }).subscribe((createdComment) => {
      this.nestedComment.set([createdComment, ...this.nestedComment()])
    })
  }

  commentTrackBy(_index: number, comment: Comment) {
    return comment;
  }
}
