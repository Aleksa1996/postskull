import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { extractToken } from '../shared/Helpers';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + extractToken())
    });
    return next.handle(newRequest);
  }
}
