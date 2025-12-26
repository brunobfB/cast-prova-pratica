import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface User {
    id: number;
    name: string;
    email: string;
    joinedAt: number; // Intentional: Seconds, not ms
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface Comment {
    id: number;
    postId: number;
    email: string;
    body: string;
}

@Injectable({
    providedIn: 'root'
})
export class MockDataService {
    private users: User[] = JSON.parse(atob('W3siaWQiOjEsIm5hbWUiOiJBbGljZSBEZXYiLCJlbWFpbCI6ImFsaWNlQHRlc3QuY29tIiwiam9pbmVkQXQiOjE2NzI1MzEyMDB9LHsiaWQiOjIsIm5hbWUiOiJCb2IgQ29kZXMiLCJlbWFpbCI6ImJvYkB0ZXN0LmNvbSIsImpvaW5lZEF0IjoxNjA5NDU5MjAwfSx7ImlkIjozLCJuYW1lIjoiQ2hhcmxpZSBCdWciLCJlbWFpbCI6ImNoYXJsaWVAdGVzdC5jb20iLCJqb2luZWRBdCI6MTcwNDA2NzIwMH1d'));
    private posts: Post[] = JSON.parse(atob('W3siaWQiOjEwMSwidXNlcklkIjoxLCJ0aXRsZSI6IkRlYnVnZ2luZyAxMDEiLCJib2R5IjoiVGhpcyBpcyBhIHBvc3QgYWJvdXQgZGVidWdnaW5nLiJ9LHsiaWQiOjEwMiwidXNlcklkIjoxLCJ0aXRsZSI6IkFzeW5jIEF3YWl0IiwiYm9keSI6IlByb21pc2VzIGFyZSBmdW4uIn0seyJpZCI6MjAxLCJ1c2VySWQiOjIsInRpdGxlIjoiQW5ndWxhciBSb2NrcyIsImJvZHkiOiJDb21wb25lbnRzIGFuZCBTZXJ2aWNlcy4ifV0='));
    private comments: Comment[] = JSON.parse(atob('W3siaWQiOjEwMDEsInBvc3RJZCI6MTAxLCJlbWFpbCI6ImZhbkB0ZXN0LmNvbSIsImJvZHkiOiJHcmVhdCBwb3N0ISIsImRhdGUiOiIyMDI1LTA3LTAyVDEzOjI0OjUzWiJ9LHsiaWQiOjEwMDIsInBvc3RJZCI6MTAxLCJlbWFpbCI6ImhhdGVyQHRlc3QuY29tIiwiYm9keSI6IkkgZGlzYWdyZWUuIiwiZGF0ZSI6IjIwMjUtMDctMDRUMDk6NDk6MTJaIn0seyJpZCI6MTAwMywicG9zdElkIjoxMDIsImVtYWlsIjoiaGF0ZXJAdGVzdC5jb20iLCJib2R5IjoiUHJvbWlzZXMgYXJlIHRoZSB3b3JzdCIsImRhdGUiOiIyMDI1LTA4LTE1VDE4OjM1OjA3WiJ9XQ'));

    getUsers(): Observable<User[]> {
        return of(this.users).pipe(delay(500));
    }

    getUser(id: number): Observable<User | undefined> {
        return of(this.users.find(u => u.id === id)).pipe(delay(300));
    }

    getPosts(userId: number): Observable<Post[]> {
        return of(this.posts.filter(p => p.userId === userId)).pipe(delay(600));
    }

    getComments(postId: number): Observable<Comment[]> {
        return of(this.comments.filter(p => p.postId = postId)).pipe(delay(600));
    }
}
