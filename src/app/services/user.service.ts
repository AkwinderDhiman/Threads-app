import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './environment';
import { User } from './interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  localStorageKey = 'threads_user';

  constructor(private http: HttpClient) { }

  createUser(user: any): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/users`, { name: user });
  }

  saveUserToStorage(user: User) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(user));
    } else {
      console.error('localStorage is not available.');
    }
  }

  getUserFromStorage(): User | null {
    if (this.isLocalStorageAvailable()) {
      const user = localStorage.getItem(this.localStorageKey);
      return user ? JSON.parse(user) as User : null;
    } else {
      console.error('localStorage is not available.');
      return null;
    }
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
