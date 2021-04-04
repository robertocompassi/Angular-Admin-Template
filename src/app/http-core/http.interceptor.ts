import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class GenericHttpInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ` + localStorage.getItem('token')
            }
        });

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };

                console.log('mensagem de erro para tratar do interceptor');
                return throwError(error);
            }),
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event request--->>>', event);
                }
                return event;
            })
        );
    }
}
