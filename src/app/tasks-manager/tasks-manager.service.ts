import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IBoard, IColumn, ITask } from './interfaces/taskList.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksManagerService {
  private url: string = 'https://wbbase.site/api';

  constructor(private http: HttpClient) {}

  // Boards

  getBoard(): Observable<IBoard> {
    return this.http.get<IBoard>(`${this.url}/boards/1`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  createBoard(
    title: string,
    authors?: string[],
    respondents?: string[],
    tags?: string[],
    categories?: string[]
  ): Observable<IBoard> {
    return this.http.post<IBoard>(`${this.url}/boards`, {
      title,
      authors,
      respondents,
      tags,
      categories,
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  editBoard(
    id: number,
    title?: string,
    authors?: string[],
    respondents?: string[],
    tags?: string[],
    categories?: string[]
  ): Observable<IBoard> {
    return this.http.post<IBoard>(`${this.url}/boards/${id}`, {
      title,
      authors,
      respondents,
      tags,
      categories,
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  // Columns

  getColumns() {
    return this.http.get<any>(`${this.url}/columns`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  getColumn(id: number): Observable<IColumn> {
    return this.http.get<IColumn>(`${this.url}/columns/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  createColumn(boardId: number, title: string) {
    return this.http.post<IColumn>(`${this.url}/columns`, { boardId, title }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  editColumn(id: number, title: string) {
    return this.http.patch<IColumn>(`${this.url}/columns/${id}`, { title }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  deleteColumn(id: number) {
    return this.http.delete<number>(`${this.url}/columns/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  // Tasks

  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.url}/tasks`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  getTask(id: number): Observable<ITask> {
    return this.http.get<ITask>(`${this.url}/tasks/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  createTask(
    columnId: number,
    title: string,
    boardId: number,
    priority?: string,
    status?: string,
    description?: string,
    authors?: string[],
    respondents?: string[],
    tags?: string[],
    category?: string
  ): Observable<ITask> {
    return this.http.post<ITask>(`${this.url}/tasks`, {
      columnId,
      title,
      priority,
      status,
      description,
      authors,
      respondents,
      tags,
      category,
      boardId,
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  editTask(id: number, updatedData: any): Observable<ITask> {
    return this.http.patch<ITask>(`${this.url}/tasks/${id}`, updatedData).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  deleteTask(id: number) {
    return this.http.delete<number>(`${this.url}/tasks/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
