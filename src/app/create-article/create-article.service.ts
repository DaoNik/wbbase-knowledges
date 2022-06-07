import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IArticle } from './../interfaces/article';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { IDepartment } from '../interfaces/department';
import { ErrorModalService } from '../error-modal/error-modal.service';

@Injectable({
  providedIn: 'root',
})
export class CreateArticleService {
  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient,
    private errorService: ErrorModalService
  ) {}

  getArticle(id: string): Observable<IArticle> {
    return this.http.get<IArticle>(`${this.apiUrl}/docker/articles/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.visibleForError(
          error.error.message[error.error.message.length - 1]
        );
        return throwError(() => error);
      })
    );
  }

  createArticle(article: IArticle): Observable<IArticle> {
    return this.http
      .post<IArticle>(`${this.apiUrl}/docker/articles`, article)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorService.visibleForError(
            error.error.message[error.error.message.length - 1]
          );
          return throwError(() => error);
        })
      );
  }

  editArticle(id: string, article: IArticle): Observable<IArticle> {
    return this.http
      .patch<IArticle>(`${this.apiUrl}/docker/articles/${id}`, article)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorService.visibleForError(
            error.error.message[error.error.message.length - 1]
          );
          return throwError(() => error);
        })
      );
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/docker/tags`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.visibleForError(
          error.error.message[error.error.message.length - 1]
        );
        return throwError(() => error);
      })
    );
  }

  getAuthors(id: number): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.apiUrl}/docker/departments/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorService.visibleForError(
            error.error.message[error.error.message.length - 1]
          );
          return throwError(() => error);
        })
      );
  }

  getDepartments(): Observable<IDepartment[]> {
    return this.http
      .get<IDepartment[]>(`${this.apiUrl}/docker/departments`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorService.visibleForError(
            error.error.message[error.error.message.length - 1]
          );
          return throwError(() => error);
        })
      );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/docker/categories`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.visibleForError(
          error.error.message[error.error.message.length - 1]
        );
        return throwError(() => error);
      })
    );
  }
}
