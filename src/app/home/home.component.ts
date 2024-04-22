import { Component, OnInit, signal } from '@angular/core';
import { CommentComponent } from "../components/comment/comment.component";
import { CommentService } from '../services/comment.service';
import { CommonModule } from '@angular/common';
import { Comment } from '../services/interfaces/comment.interface';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommentComponent,
        HttpClientModule,
        RouterModule,
        CommonModule,
        CommentFormComponent]
})
export class HomeComponent implements OnInit {
    constructor(private commentService: CommentService, private userService: UserService) { }

    comments = signal<Comment[]>([]);

    ngOnInit(): void {
        this.getComments()
    }


    getComments() {
        this.commentService.getComments().subscribe(
            (comments) => {
                this.comments.set(comments)
            },
            (error) => {
                console.error('Error fetching comments:', error);
            }
        );
    }

    onCreateComment(formValues: { text: string }) {
        const { text } = formValues;
        let user = this.userService.getUserFromStorage();
        if (!user) {
            return;
        }
        this.commentService.createComment({
            text,
            userId: user['_id']
            // parentId:''
        }).subscribe((createdComment) => {
            this.comments.set([createdComment, ...this.comments()])
        })
    }

    commentTrackBy(_index:number,comment:Comment){
        return comment._id;
    }
}
