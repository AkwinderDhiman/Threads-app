import { Component, Injectable, OnInit, inject, signal } from '@angular/core';
import { CommentComponent } from "../components/comment/comment.component";
import { CommentService } from '../services/comment.service';
import { CommonModule } from '@angular/common';
import { Comment } from '../services/interfaces/comment.interface';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommentComponent,
        HttpClientModule,
        RouterModule,
    CommonModule]
})
export class HomeComponent implements OnInit {
    // commentService = inject(CommentService)
    constructor(private commentService: CommentService) { }
    comments = signal<Comment[]>([]);

    ngOnInit(): void {
        this.getComments()
    }


    getComments() {
        
        console.log('home======');
        this.commentService.getComments().subscribe(
            (comments) => {
                this.comments.set(comments)
                console.log(comments,'home======');
            },
            (error) => {
                console.error('Error fetching comments:', error);
            }
        );
        
    }
}
