import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient)


  getPostComments(postId: any): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}/comments`)
  }

  createComment(postId: any, data: any): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/posts/${postId}/comments`, data)
  }
  private commentAddedSource = new Subject<void>();
  commentAdded = this.commentAddedSource.asObservable();
  notifycommentAdded() {
    this.commentAddedSource.next();
  }

  deleteComment(postId: string, commentId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/posts/${postId}/comments/${commentId}`)
  }
  private commentDeletedSource = new Subject<void>();
  commentDeleted = this.commentDeletedSource.asObservable();
  notifycommentDeleted() {
    this.commentDeletedSource.next();
  }

  updateComment(postId: any, commentId: any, data: any): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}/comments/${commentId}`, data)
  }
  private commentUpdatedSource = new Subject<void>();
  commentUpdated = this.commentUpdatedSource.asObservable();
  notifycommentUpdated() {
    this.commentUpdatedSource.next();
  }
}
