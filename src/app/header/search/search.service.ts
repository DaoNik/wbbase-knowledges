import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { IArticle } from 'src/app/interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // private url: string = 'http://localhost:4500/mock-articles.json'

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject('API_URL') private apiUrl: string
  ) {}

  getArticles(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  goToSearchResults(title: string, categories: string[]) {
    if (title == null)
      this.router.navigate(['search-result', ``, `${categories}`]);
    else this.router.navigate(['search-result', `${title}`, `${categories}`]);
  }
}
