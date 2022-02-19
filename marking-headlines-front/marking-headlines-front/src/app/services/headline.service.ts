import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/s/user.model';
import { Headline } from '../models/headline.model';

import { ToastrService } from 'ngx-toastr';

const baseUrl = 'http://localhost:8080/api/headlines';

@Injectable({
  providedIn: 'root'
})
export class HeadlineService {

  constructor(private http: HttpClient, 
    private toastr: ToastrService) { }

  createUser(newUser: User): Observable<User> {
    return this.http.post<User>(baseUrl, newUser);
  }

  getHeadlinesForUser(userNumber: string): Observable<Headline[]> {
    return this.http.get<Headline[]>(`${baseUrl}/${userNumber}`)
  }

  showSuccess(message: string, title: string){
      this.toastr.success(message, title);
  }
}
