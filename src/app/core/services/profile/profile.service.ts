import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly httpClient = inject(HttpClient)

  private myProfileCache: Observable<any>|null = null;
  getMyProfile() {
    if(this.myProfileCache) {
      return this.myProfileCache;
    };
    this.myProfileCache = this.httpClient.get<any>(`${environment.baseUrl}/users/profile-data`).pipe(
      switchMap((res1) => {
        const userId = res1.data.user.id

        return this.httpClient.get<any>(`${environment.baseUrl}/users/${userId}/posts`).pipe(
          map((res2) => {
            return {
              user: res1.data.user,
              posts: res2.data.posts
            };
          })
        );
      }),
      shareReplay(1)
    );
    return this.myProfileCache;
  }
  


  getUserProfile(userId: any): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/profile`);
  }
  getUserPosts(userId: any): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}/posts`);
  }
  // : Observable<any> {
  //   return 
  //   return this.httpClient.get(``).subscribe({
  //     next: (res) => {
  //       console.log(res);
        
  //     }
  //   })
  // }
  // getfUserProfile(userId: string) {
  //   return this.httpClient.get<any>(`${environment.baseUrl}}/users/${userId}/profile`).pipe(
  //     switchMap((res1) => {
  //       const userId = res1.data.user.id

  //       return this.httpClient.get<any>(`${environment.baseUrl}/users/${userId}/posts`).pipe(
  //         map((res2) => {
  //           return {
  //             user: res1.data.user,
  //             posts: res2.data.posts
  //           };
  //         })
  //       );
  //     }),
  //   );
  // }
}
