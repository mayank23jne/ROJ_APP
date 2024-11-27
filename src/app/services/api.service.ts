import { Injectable, signal } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userData:any =JSON.parse(localStorage.getItem('app_user') || '');
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
    return this.fetchApi('post', 'getSingleUser', { id: this.userData.user_id });
  }
  getSingleOrg() {
    return this.fetchApi('get', `org/get-profile/${this.userData.user_id}`);
  }
  donorDashboard() {
    return this.fetchApi('post','donor/dashboard',{ user_id:this.userData.user_id});
  }

  register(data:any) {
    return this.fetchApi('post','user-register', data);
  }
  getWeeklyDonations() {
    return this.fetchApi('post', 'donor/getWeeklyDonations',{user_id:this.userData.user_id});
  }
}
