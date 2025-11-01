import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  baseUrl = environment.baseUrl + '/feedback/';

  constructor(private http: HttpClient) {}
  sendFeedback(data:any) {
    return this.http.post(this.baseUrl, data);
  }
}
