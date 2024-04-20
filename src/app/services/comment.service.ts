import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Comment } from './interfaces/comment.interface';
import { Observable } from 'rxjs';
import { environment } from './environment';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private http:HttpClient) { }

  getComments(parentId :string = ''): Observable<Comment[]>{
    let url =`${environment.apiBaseUrl}/comments`;
    if(parentId){
      url += `?parentId=${parentId}`
    }    
   return this.http.get<Comment[]>(url);
  }
}
