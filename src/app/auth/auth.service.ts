import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

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

export enum Role {
  User = 'User',
  Doctor = 'Doctor',
  Administrator = 'Administrator'
}

export class Claims {
  id: string;
  roles: Role[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private httpClient: HttpClient, private jwt: JwtHelperService) { }

  login(credentials: Credentials) {
    return this.httpClient.post<LoginResult>('auth/login', credentials).pipe(tap(response => {
      localStorage.setItem('access-token', response.accessToken);
    }));
  }

  logout() {
    localStorage.removeItem('access-token');
  }

  register(register: Register) {
    return this.httpClient.post<void>('auth/register', register);
  }

  getClaims() {
    return this.jwt.decodeToken() as Claims | undefined;
  }

  isAuthenticated() {
    return !this.jwt.isTokenExpired();
  }
}
