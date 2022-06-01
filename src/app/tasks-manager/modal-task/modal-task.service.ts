import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorModalService } from 'src/app/error-modal/error-modal.service';
import { ModalTaskComponent } from './modal-task.component';

@Injectable({
  providedIn: 'root',
})
export class ModalTaskService {
  private url: string = 'https://wbbase.site/api';
  private taskUrl = `${this.url}/tasks`;
  private columnUrl = `${this.url}/columns`;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string,
    private errorService: ErrorModalService
  ) {}

  openDialog(data?: any): void {
    const dialogRef = this.dialog.open(ModalTaskComponent, {
      panelClass: 'modal-task-global',
      data: data,
      maxWidth: '900px',
      width: '90%',
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
    });
  }

  getTasks(): Observable<any> {
    return this.http.get<any>(this.taskUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.visibleForError(
          error.error.message[error.error.message.length - 1]
        );
        return throwError(() => error);
      })
    );
  }

  getTask(id: number): Observable<any> {
    return this.http.get<any>(`${this.taskUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.visibleForError(
          error.error.message[error.error.message.length - 1]
        );
        return throwError(() => error);
      })
    );
  }

  updateTask(id: number, updatedData: any): Observable<any> {
    return this.http.patch<any>(`${this.taskUrl}/${id}`, updatedData).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.visibleForError(
          error.error.message[error.error.message.length - 1]
        );
        return throwError(() => error);
      })
    );
  }

  getColumns() {
    return this.http.get<any>(this.columnUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.visibleForError(
          error.error.message[error.error.message.length - 1]
        );
        return throwError(() => error);
      })
    );
  }
}
