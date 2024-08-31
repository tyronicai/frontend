import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HttpResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { UserService } from '../services/user/user.service';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	private isRefreshing = false;
	private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(private userService: UserService, private authService: AuthService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const currentUser = this.userService.currentUserValue;
		const isLoggedIn = currentUser && currentUser.token;
		if (isLoggedIn) {
			request = this.addToken(request, currentUser.token);
		}

		// @ts-ignore
		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					// console.log('event: ', event);
				}
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				console.log(error);
				if (error.status === 401) {
					return this.handle401Error(request, next);
				}
				if (error.status === 400) {
					// Bad Request
				}
				return throwError(error);
			})
		);
	}

	addToken(request: HttpRequest<any>, token: string) {
		return request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
		if (!this.isRefreshing) {
			this.isRefreshing = true;
			this.refreshTokenSubject.next(null);

			return this.authService.refreshToken().pipe(
				switchMap((token: any) => {
					this.isRefreshing = false;
					this.refreshTokenSubject.next(token.RefreshToken);
					return next.handle(this.addToken(request, token.RefreshToken));
				})
			);
		} else {
			return this.refreshTokenSubject.pipe(
				filter((token) => token != null),
				take(1),
				switchMap((jwt) => {
					return next.handle(this.addToken(request, jwt));
				})
			);
		}
	}
}
