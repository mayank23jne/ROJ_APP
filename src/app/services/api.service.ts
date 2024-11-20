import { Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }
  
  headers = new HttpHeaders().set('Content-Type', 'application/json')
                                 .set('Accept', 'application/json')
                                 .set('responseType', 'text')
    .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  
  fetchApi(method: string, url: any, data: any=''): Observable<any> {
    const options = { headers: this.headers };
    const fullUrl=`https://rainbowsofjoy.org/app-api/${url}`
    switch (method.toLowerCase()) {
      case 'get':
        return this.http.get(fullUrl, options);
      case 'post':
        return this.http.post(fullUrl, data, options);
      case 'put':
        return this.http.put(fullUrl, data, options);
      case 'delete':
        return this.http.delete(fullUrl, options);
      default:
        throw new Error(`Unsupported request method: ${method}`);
    }
  }
  login(data:any) {
    return this.fetchApi('post','user-login', data);
  }
  getSingleUser() {
    const userData = localStorage.getItem('app_user') || '';
    const data = JSON.parse(userData);
    
    return this.fetchApi('post', 'getSignelUser', { id: data.user_id });
  }

  dashboard(){
    return this.fetchApi('post','dashboard_details');
  }
  permission() {
    return this.fetchApi('post','permission');
  }

  register(data:any) {
    return this.fetchApi('post','user-register', data);
  }
}
