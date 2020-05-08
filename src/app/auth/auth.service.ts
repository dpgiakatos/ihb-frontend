import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface Credentials {
  email: string;
  password: string;
}

interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginResult {
  accessToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  login(credentials: Credentials) {
    return this.httpClient.post<LoginResult>('auth/login', credentials).pipe(tap(response => {
      localStorage.setItem('access-token', response.accessToken);
    }));
  }

  register(register: Register) {
    return this.httpClient.post<void>('auth/register', register);
  }
}
