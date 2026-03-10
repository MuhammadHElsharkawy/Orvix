import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient)

  getAllPosts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts`)
  }

  createPost(formdata: FormData): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/posts`, formdata)
  }

  private postAddedSource = new Subject<void>();
  postAdded = this.postAddedSource.asObservable();
  notifyPostAdded() {
    this.postAddedSource.next();
  }


  getPostDetails(postId: any): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/posts/${postId}`)
  }

  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/posts/${postId}`)
  }
  private postDeletedSource = new Subject<void>();
  postDeleted = this.postDeletedSource.asObservable();
  notifyPostDeleted() {
    this.postDeletedSource.next();
  }


  private editPostSource = new BehaviorSubject<any>(null);
  editPost = this.editPostSource.asObservable();
  emitEditPost(post: any) {
    this.editPostSource.next(post);
  }
  updatePost(postId: string, data: any): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}`, data)
  }




}
