import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
              private account: AccountService) {}

  login : string = "";

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.token;
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    console.log({reqFront : req.url});
    return next.handle(newRequest);
  }
}