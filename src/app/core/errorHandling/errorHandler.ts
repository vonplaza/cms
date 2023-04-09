import { HttpErrorResponse } from "@angular/common/http";
import { AppError } from "../models/app-error";
import { throwError } from "rxjs";

export function handleError(error: HttpErrorResponse) {
  console.log(error);
  
  const appError: AppError = {
    status: error.status,
    message: error.error.message
  }
  // if (error.status === 0) {
  //   // A client-side or network error occurred. Handle it accordingly.
  //   console.error('An error occurred:', error.error);
  // } else {
  //   // The backend returned an unsuccessful response code.
  //   // The response body may contain clues as to what went wrong.
  //   console.error(
  //     `Backend returned code ${error.status}, body was: `, error.error);
  // }
  // Return an observable with a user-facing error message.
  return throwError(() => appError);
}